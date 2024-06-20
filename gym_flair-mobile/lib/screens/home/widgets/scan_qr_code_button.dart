import 'package:flutter/material.dart';
import 'package:gym_flair/screens/home/widgets/qr_scanner_screen.dart';
import '../../../shared/sizes.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class ScanQrCodeButton extends StatelessWidget {
  const ScanQrCodeButton({super.key, required this.socket});
  final IO.Socket socket;
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return ElevatedButton(
        onPressed: (){
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (e) => QrScannerScreen(socket: socket),
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          side: BorderSide(color: Theme.of(context).colorScheme.inversePrimary),
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(ConstantSizes.circularRadius)
          ),
          padding: EdgeInsets.symmetric(
            vertical: screenHeight * 0.02,
            horizontal: screenWidth * 0.03
          ),
            elevation: 4,
            shadowColor: Theme.of(context).colorScheme.shadow
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
                'Scan QR code',
                 style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                   color: Colors.white
                 )
            ),
            SizedBox(
              width: screenWidth*0.05,
            ),
            Icon(
              Icons.qr_code_scanner,
              color: Theme.of(context).colorScheme.onInverseSurface ,
            ),
          ],
        )
    );
  }
}


/*
SizedBox(
          height: screenHeight*0.03,
          width: screenWidth,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                  'Scan QR code',
                   style: Theme.of(context).textTheme.labelLarge,
              ),
              SizedBox(
                width: screenWidth*0.05,
              ),
              Icon(
                Icons.qr_code_scanner,
                color: Theme.of(context).colorScheme.onInverseSurface ,
              ),
            ],

* */