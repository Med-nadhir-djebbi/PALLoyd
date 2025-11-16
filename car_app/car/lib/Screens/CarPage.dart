import 'package:flutter/material.dart';

import 'package:car/colors.dart'  ;

class Carpage extends StatefulWidget {
  const Carpage({super.key});

  @override
  State<Carpage> createState() => _CarpageState();
}

class _CarpageState extends State<Carpage> {
  // Small builder for car property containers
  Widget _carPropTile({
    required IconData icon,
    required Color accent,
    required String title,
    required String value,
    String? subtitle,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: accent.withOpacity(0.10),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: accent.withOpacity(0.35), width: 1),
      ),
      child: Row(
        children: [
          Icon(icon, color: accent, size: 28),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    color: principal_text,
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                if (subtitle != null) ...[
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: TextStyle(
                      color: principal_text.withOpacity(0.75),
                      fontSize: 12,
                    ),
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(width: 8),
          Text(
            value,
            style: TextStyle(
              color: principal_text,
              fontSize: 15,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 16),
              Center(
                child: Image.asset(
                  'assets/logo_diagnosis.png',
                  height: 72,
                  fit: BoxFit.contain,
                ),
              ),
              const SizedBox(height: 12),
              // Diagnostics list
              Expanded(
                child: ListView(
                  padding: EdgeInsets.zero,
                  children: [
                    Text(
                      'Vehicle diagnostics',
                      style: TextStyle(
                        color: principal_text,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 12),
                    // Tire pressure
                    _carPropTile(
                      icon: Icons.tire_repair,
                      accent: Colors.blueAccent,
                      title: 'Tire Pressure',
                      subtitle: 'Average across tires',
                      value: '2.3 bar',
                    ),
                    // Odometer
                    _carPropTile(
                      icon: Icons.speed,
                      accent: Colors.indigoAccent,
                      title: 'Odometer',
                      value: '58,231 km',
                    ),
                    // Oil pressure
                    _carPropTile(
                      icon: Icons.oil_barrel,
                      accent: Colors.orangeAccent,
                      title: 'Oil Pressure',
                      value: '3.1 bar',
                    ),
                    // Oil level
                    _carPropTile(
                      icon: Icons.oil_barrel,
                      accent: Colors.green,
                      title: 'Oil Level',
                      value: 'OK',
                    ),
                    // Battery status
                    _carPropTile(
                      icon: Icons.battery_full,
                      accent: Colors.green,
                      title: 'Battery',
                      value: '12.4 V',
                    ),
                    // Coolant temperature
                    _carPropTile(
                      icon: Icons.thermostat,
                      accent: Colors.lightBlue,
                      title: 'Coolant Temp',
                      value: '90 °C',
                    ),
                    // Brake fluid
                    _carPropTile(
                      icon: Icons.hardware,
                      accent: Colors.green,
                      title: 'Brake Fluid',
                      value: 'OK',
                    ),
                    // Lights status
                    _carPropTile(
                      icon: Icons.light_mode,
                      accent: Colors.amber,
                      title: 'Lights',
                      value: 'AUTO',
                    ),
                    // Doors lock
                    _carPropTile(
                      icon: Icons.lock,
                      accent: Colors.green,
                      title: 'Doors',
                      value: 'Locked',
                    ),
                    // Engine status
                    _carPropTile(
                      icon: Icons.car_repair,
                      accent: Colors.green,
                      title: 'Engine',
                      value: 'No faults',
                    ),
                  ],
                ),
              ),
              // ...existing page content goes here...
            ],
          ),
        ),
      ),
    );
  }
}