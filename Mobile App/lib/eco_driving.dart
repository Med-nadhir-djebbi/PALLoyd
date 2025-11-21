
import 'package:flutter/material.dart';

class EcoDriving extends StatelessWidget {
  const EcoDriving({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF222838),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildScoreCard(),
            const SizedBox(height: 24),

            const Text(
              "Driving Events",
              style: TextStyle(
                color: Colors.white,
                fontFamily: 'SF_Pro',
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),

            _buildEventCard(
              title: "Sudden Braking",
              count: "3 instances",
              description:
                  "Hard braking detected. Anticipate traffic flow to brake smoother and save fuel.",
              icon: Icons.warning_amber_rounded,
              color: Colors.orange,
            ),
            const SizedBox(height: 12),
            _buildEventCard(
              title: "Road Hazards",
              count: "2 potholes",
              description:
                  "Impact detected. Avoiding potholes protects your suspension and tires.",
              icon: Icons.broken_image_outlined,
              color: Colors.redAccent,
            ),
            const SizedBox(height: 12),
            _buildEventCard(
              title: "Speed Limit",
              count: "1 instance",
              description:
                  "Exceeded limit by 10km/h. Consistent speed improves fuel economy by up to 15%.",
              icon: Icons.speed,
              color: Colors.yellow,
            ),

            const SizedBox(height: 24),
            const Text(
              "Efficiency Tips",
              style: TextStyle(
                color: Colors.white,
                fontFamily: 'SF_Pro',
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),

            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.05),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white.withOpacity(0.1)),
              ),
              child: Column(
                children: [
                  _buildTipRow("Maintain steady speed to reduce consumption."),
                  const SizedBox(height: 12),
                  _buildTipRow("Check tire pressure regularly."),
                  const SizedBox(height: 12),
                  _buildTipRow("Remove excess weight from the vehicle."),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildScoreCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF4CAF50), Color(0xFF2E7D32)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          const Text(
            "Your Eco Score",
            style: TextStyle(
              color: Colors.white70,
              fontFamily: 'SF_Pro',
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            "85",
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'SF_Pro',
              fontSize: 48,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Text(
              "Great Driver",
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEventCard({
    required String title,
    required String count,
    required String description,
    required IconData icon,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF2A3040),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color, size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        color: Colors.white,
                        fontFamily: 'SF_Pro',
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      count,
                      style: TextStyle(
                        color: color,
                        fontFamily: 'SF_Pro',
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  description,
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.6),
                    fontFamily: 'SF_Pro',
                    fontSize: 13,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTipRow(String text) {
    return Row(
      children: [
        const Icon(
            Icons.check_circle_outline, color: Color(0xFF4CAF50), size: 20),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            text,
            style: const TextStyle(
              color: Colors.white,
              fontFamily: 'SF_Pro',
              fontSize: 14,
            ),
          ),
        ),
      ],
    );
  }
}