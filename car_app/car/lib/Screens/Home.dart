import 'package:flutter/material.dart';
import 'package:car/colors.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {

  int score = 23;
  bool carHasTrouble = false;

  String _titleForScore(int s) {
    if (s >= 75) return 'Excellent driver';
    if (s >= 50) return 'Good driver, you can do better';
    return 'Improve your driving style';
  }

  Widget _alertTile({
    required IconData icon,
    required Color accent,
    required String title,
    required String message,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: accent.withOpacity(0.12),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: accent.withOpacity(0.35), width: 1),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
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
                const SizedBox(height: 6),
                Text(
                  message,
                  style: TextStyle(
                    color: principal_text.withOpacity(0.85),
                    fontSize: 14,
                    height: 1.3,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _carStatusTile() {
    final hasTrouble = carHasTrouble;
    final accent = hasTrouble ? Colors.redAccent : Colors.green;
    final icon =
        hasTrouble ? Icons.warning_amber_rounded : Icons.check_circle_rounded;
    final message = hasTrouble
        ? 'Issues detected. Please check your car systems.'
        : 'All systems normal. No issues detected.';

    return _alertTile(
      icon: icon,
      accent: accent,
      title: 'Car Status',
      message: message,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 16),
          
                Center(
                  child: Image.asset(
                    'assets/logo.png',
                    height: 72,
                    fit: BoxFit.contain,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  _titleForScore(score),
                  style: TextStyle(
                    color: principal_text,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                Text(
                  "Your Score is : " + score.toString(),
                  style: TextStyle(
                    color: principal_text,
                    fontSize: 20,
                    fontWeight: FontWeight.w400
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                ScoreBar(score: score, height: 16),
          
                const SizedBox(height: 24),
                Text(
                  'Car Status',
                  style: TextStyle(
                    color: principal_text,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.start,
                ),
                const SizedBox(height: 12),
                _carStatusTile(),
          
                const SizedBox(height: 24),
                Text(
                  'Alertes',
                  style: TextStyle(
                    color: principal_text,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.start,
                ),
                const SizedBox(height: 12),
                _alertTile(
                  icon: Icons.bolt,
                  accent: Colors.redAccent,
                  title: 'Severe Thunderstorm Warning',
                  message:
                      'Strong winds, heavy rain and lightning expected in your area. Avoid driving if possible.',
                ),
                _alertTile(
                  icon: Icons.water_drop,
                  accent: Colors.orangeAccent,
                  title: 'Heavy Rain Advisory',
                  message:
                      'Reduced visibility and slippery roads. Drive cautiously and keep a safe distance.',
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class ScoreBar extends StatelessWidget {
  const ScoreBar({super.key, required this.score, this.height = 14});

  final int score; 
  final double height;

  @override
  Widget build(BuildContext context) {
    final clamped = score.clamp(0, 100);
    final fraction = clamped / 100.0;
    final Color barColor =
        clamped >= 75 ? Colors.green : (clamped >= 50 ? Colors.yellow : Colors.red);

    return LayoutBuilder(
      builder: (context, constraints) {
        final totalWidth = constraints.maxWidth;
        final filledWidth = totalWidth * fraction;

        return Semantics(
          label: 'Score progress',
          value: '$clamped percent',
          child: ClipRRect(
            borderRadius: BorderRadius.circular(height / 2),
            child: Stack(
              children: [

                Container(
                  width: totalWidth,
                  height: height,
                  color: Theme.of(context).brightness == Brightness.dark
                      ? Colors.white10
                      : Colors.black12,
                ),

                AnimatedContainer(
                  duration: const Duration(milliseconds: 350),
                  curve: Curves.easeOut,
                  width: filledWidth,
                  height: height,
                  decoration: BoxDecoration(
                    color: barColor,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
