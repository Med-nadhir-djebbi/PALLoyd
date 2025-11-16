import 'package:car/colors.dart';
import 'package:flutter/material.dart';


class Coachingpage extends StatefulWidget {
  const Coachingpage({super.key});

  @override
  State<Coachingpage> createState() => _CoachingpageState();
}

class _CoachingpageState extends State<Coachingpage> {
  final List<Map<String, dynamic>> _trips = [
    {
      'date': '2025-11-15 08:10',
      'distanceKm': 18.6,
      'durationMin': 27,
      'avgSpeed': 41,
      'score': 82,
      'overspeed': 2,
      'harshBraking': 1,
      'harshCornering': 0,
      'distractions': 0,
    },
    {
      'date': '2025-11-14 18:22',
      'distanceKm': 7.9,
      'durationMin': 16,
      'avgSpeed': 29,
      'score': 74,
      'overspeed': 1,
      'harshBraking': 0,
      'harshCornering': 1,
      'distractions': 1,
    },
    {
      'date': '2025-11-13 07:40',
      'distanceKm': 25.3,
      'durationMin': 33,
      'avgSpeed': 46,
      'score': 88,
      'overspeed': 0,
      'harshBraking': 0,
      'harshCornering': 0,
      'distractions': 0,
    },
  ];

  final Set<int> _expanded = {};

  Widget _metric(IconData icon, String text, {Color? color}) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 16, color: color ?? principal_text.withOpacity(0.9)),
        const SizedBox(width: 6),
        Text(
          text,
          style: TextStyle(
            color: principal_text.withOpacity(0.95),
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  Widget _tripCard(int index, Map<String, dynamic> t) {
    final bool isOpen = _expanded.contains(index);
    final Color accent = (t['score'] as int) >= 75
        ? Colors.green
        : (t['score'] as int) >= 50
            ? Colors.amber
            : Colors.redAccent;

    return InkWell(
      onTap: () {
        setState(() {
          if (isOpen) {
            _expanded.remove(index);
          } else {
            _expanded.add(index);
          }
        });
      },
      borderRadius: BorderRadius.circular(12),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: accent.withOpacity(0.08),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: accent.withOpacity(0.35), width: 1),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.route, color: accent),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Trip on ${t['date']}',
                    style: TextStyle(
                      color: principal_text,
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
                AnimatedRotation(
                  duration: const Duration(milliseconds: 200),
                  turns: isOpen ? 0.5 : 0.0,
                  child: Icon(Icons.keyboard_arrow_down,
                      color: principal_text.withOpacity(0.8)),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 16,
              runSpacing: 8,
              children: [
                _metric(Icons.straighten, '${t['distanceKm']} km'),
                _metric(Icons.schedule, '${t['durationMin']} min'),
                _metric(Icons.speed, '${t['avgSpeed']} km/h'),
                _metric(Icons.verified, 'Score ${t['score']}/100',
                    color: accent),
              ],
            ),
            AnimatedCrossFade(
              crossFadeState:
                  isOpen ? CrossFadeState.showFirst : CrossFadeState.showSecond,
              duration: const Duration(milliseconds: 200),
              firstChild: Padding(
                padding: const EdgeInsets.only(top: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _detailLine(
                      icon: Icons.speed,
                      color: Colors.amber,
                      text:
                          'Monitoring of speed: overspeed events ${t['overspeed']}',
                    ),
                    _detailLine(
                      icon: Icons.stop_circle_outlined,
                      color: Colors.orangeAccent,
                      text:
                          'Braking: harsh brakings ${t['harshBraking']}',
                    ),
                    _detailLine(
                      icon: Icons.alt_route,
                      color: Colors.lightBlueAccent,
                      text:
                          'Cornering: harsh cornerings ${t['harshCornering']}',
                    ),
                    _detailLine(
                      icon: Icons.warning_amber_rounded,
                      color: Colors.redAccent,
                      text:
                          'Detection of risky behaviors with evaluation in the score',
                    ),
                    _detailLine(
                      icon: Icons.phone_iphone,
                      color: Colors.purpleAccent,
                      text:
                          'Detection of distractions: ${t['distractions']}',
                    ),
                  ],
                ),
              ),
              secondChild: const SizedBox.shrink(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _detailLine({
    required IconData icon,
    required Color color,
    required String text,
  }) {
    return Padding(
      padding: const EdgeInsets.only(top: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 16, color: color),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                color: principal_text.withOpacity(0.95),
                fontSize: 13,
                height: 1.25,
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final totalKm = _trips.fold<double>(0.0, (s, t) => s + (t['distanceKm'] as num).toDouble());
    final totalMin = _trips.fold<int>(0, (s, t) => s + (t['durationMin'] as int));
    final overallAvg = totalMin == 0 ? 0 : totalKm / (totalMin / 60.0);

    return Scaffold(
      backgroundColor: backgroundColor,
      body: SingleChildScrollView(
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 16),
                Center(
                  child: Image.asset(
                    'assets/logo_coaching.png',
                    height: 72,
                    fit: BoxFit.contain,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'Trips coaching',
                  style: TextStyle(
                    color: principal_text,
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 6),
                Wrap(
                  spacing: 16,
                  runSpacing: 8,
                  children: [
                    _metric(Icons.straighten, '${totalKm.toStringAsFixed(1)} km'),
                    _metric(Icons.schedule, '$totalMin min'),
                    _metric(Icons.speed, '${overallAvg.toStringAsFixed(0)} km/h'),
                  ],
                ),
                const SizedBox(height: 16),
                for (int i = 0; i < _trips.length; i++) _tripCard(i, _trips[i]),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
