import 'package:flutter/material.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'colors.dart';
import 'Screens/Home.dart';
import 'Screens/CarPage.dart';
import 'Screens/CoachingPage.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home  : HomePage()
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _index=1;
  final screens  = [
    Home(),
    Carpage(),
    Coachingpage(),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: screens[_index],
      bottomNavigationBar: CurvedNavigationBar(
        backgroundColor: backgroundColor,
        index: _index,
        color: principal_text,
        items: <Widget>[
          Icon(Icons.home_outlined, size: 30, color: backgroundColor),
          Icon(Icons.car_repair_outlined, size: 30, color: backgroundColor),
          Icon(Icons.person, size: 30, color: backgroundColor),
        ],
        onTap: (index) {
          setState(() {_index=index;});
        },
      ),
    );
  }
}

