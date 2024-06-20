const jwtCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt='));
const jwt = jwtCookie ? jwtCookie.split('=')[1] : null;

const headers = jwt ? {
  'Authorization': `Bearer ${jwt}`,
  'Content-Type': 'application/json'
} : {
  'Content-Type': 'application/json'
}

function submitForm(event, inputIds, url) {

    event.preventDefault()

      const formData = {}

      inputIds.map((item) => {
        formData[item] = document.getElementById(item).value 
    })

      fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(formData)
      }).then(async res => {
        data = await res.json()
        console.log(data)
        if(data.redirectTo ){
          window.location.href = data.redirectTo
        }
      })
      .catch(error => console.error('Error:', error));
  }

  async function logOut() {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
      });
      
      data = await response.json()
      if (data.redirectTo){
          window.location.href = data.redirectTo
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }