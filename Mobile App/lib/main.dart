import 'package:flutter/material.dart';
import 'homepage.dart';
import 'vehicle_diagnosis.dart';
import 'eco_driving.dart';
import 'weather.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});
  
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final screens = [
    const HomePage(),
    const VehicleDiagnosisPage(),
    const EcoDriving(),
    
    const Weather(),
  ];
  int _navIndex = 0;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home : Scaffold(
        backgroundColor: const Color(0xFF222838),
        
        appBar: AppBar(
        backgroundColor: const Color(0xFF222838),
        elevation: 0,
        centerTitle: true,
        title: Image.asset(
          'assets/Name.png',
          height: 30,
          fit: BoxFit.contain,
        ),
      ),
      bottomNavigationBar: Theme(
        data: Theme.of(context).copyWith(canvasColor: const Color(0xFF222838)),
        child: BottomNavigationBar(
          currentIndex: _navIndex,
          onTap: (i) => setState(() => _navIndex = i),
          type: BottomNavigationBarType.fixed,
          backgroundColor: const Color(0xFF222838),
          selectedItemColor: const Color(0xFF2ED1B1),
          unselectedItemColor: Colors.white54,
          showUnselectedLabels: true,
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.directions_car), label: 'Vehicle'),
            BottomNavigationBarItem(icon: Icon(Icons.eco), label: 'Eco'),
            
            BottomNavigationBarItem(icon: Icon(Icons.cloud), label: 'Weather'),
          ],
        ),
      ),
      body: screens[_navIndex],
      )
    );
  }
}





