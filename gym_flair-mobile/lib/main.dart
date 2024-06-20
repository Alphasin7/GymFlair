import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:gym_flair/bottom_navigation_page.dart';
import 'package:gym_flair/check_and_redirect_if_loggedin.dart';
import 'package:gym_flair/screens/home/home_screen.dart';
import 'package:gym_flair/screens/inscription/inscription.dart';
import 'package:gym_flair/screens/login/login_screen.dart';
import 'package:gym_flair/screens/welcome/welcome_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF2ec4b6),
        ),
        useMaterial3: true,
      ),
      home: const Redirect(),
    );
  }
}
