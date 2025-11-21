import 'package:flutter/material.dart';

class Weather extends StatelessWidget {
  const Weather({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF222838),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.location_on,
                    color: Color(0xFF2ED1B1), size: 24),
                const SizedBox(width: 8),
                const Text(
                  "Tunis, Tunisia",
                  style: TextStyle(
                    color: Colors.white,
                    fontFamily: 'SF_Pro',
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Spacer(),
                Text(
                  "Today, 10:30 AM",
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.6),
                    fontFamily: 'SF_Pro',
                    fontSize: 14,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            _buildMainWeatherCard(),

            const SizedBox(height: 24),

            const Text(
              "Driving Conditions",
              style: TextStyle(
                color: Colors.white,
                fontFamily: 'SF_Pro',
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),

            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.4,
              children: [
                _buildMetricCard(
                    "Visibility", "10 km", "Excellent", Icons.visibility),
                _buildMetricCard(
                    "Road Surface", "Dry", "Optimal Grip", Icons.edit_road),
                _buildMetricCard("Wind", "15 km/h", "Low Risk", Icons.air),
                _buildMetricCard(
                    "Precipitation", "0%", "None", Icons.water_drop_outlined),
              ],
            ),

            const SizedBox(height: 24),
            const Text(
              "Hourly Forecast",
              style: TextStyle(
                color: Colors.white,
                fontFamily: 'SF_Pro',
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),

            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _buildHourlyItem("11 AM", Icons.wb_sunny, "24°"),
                  _buildHourlyItem("12 PM", Icons.wb_sunny, "26°"),
                  _buildHourlyItem("1 PM", Icons.wb_sunny, "27°"),
                  _buildHourlyItem("2 PM", Icons.wb_cloudy, "26°"),
                  _buildHourlyItem("3 PM", Icons.cloud, "25°"),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMainWeatherCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF31C5E7), Color(0xFF2E7D32)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                "24°C",
                style: TextStyle(
                  color: Colors.white,
                  fontFamily: 'SF_Pro',
                  fontSize: 48,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 4),
              Text(
                "Sunny",
                style: TextStyle(
                  color: Colors.white,
                  fontFamily: 'SF_Pro',
                  fontSize: 20,
                  fontWeight: FontWeight.w500,
                ),
              ),
              SizedBox(height: 8),
              Text(
                "Feels like 26°",
                style: TextStyle(
                  color: Colors.white70,
                  fontFamily: 'SF_Pro',
                  fontSize: 14,
                ),
              ),
            ],
          ),
          const Icon(
            Icons.wb_sunny_rounded,
            color: Colors.yellow,
            size: 80,
          ),
        ],
      ),
    );
  }

  Widget _buildMetricCard(
      String title, String value, String status, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF2A3040),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            children: [
              Icon(icon, color: const Color(0xFF2ED1B1), size: 20),
              const SizedBox(width: 8),
              Text(
                title,
                style: TextStyle(
                  color: Colors.white.withOpacity(0.7),
                  fontFamily: 'SF_Pro',
                  fontSize: 12,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: const TextStyle(
              color: Colors.white,
              fontFamily: 'SF_Pro',
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            status,
            style: const TextStyle(
              color: Color(0xFF4CAF50),
              fontFamily: 'SF_Pro',
              fontSize: 12,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHourlyItem(String time, IconData icon, String temp) {
    return Container(
      margin: const EdgeInsets.only(right: 16),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFF2A3040),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          Text(
            time,
            style: TextStyle(
              color: Colors.white.withOpacity(0.7),
              fontFamily: 'SF_Pro',
              fontSize: 12,
            ),
          ),
          const SizedBox(height: 8),
          Icon(icon, color: Colors.white, size: 24),
          const SizedBox(height: 8),
          Text(
            temp,
            style: const TextStyle(
              color: Colors.white,
              fontFamily: 'SF_Pro',
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}