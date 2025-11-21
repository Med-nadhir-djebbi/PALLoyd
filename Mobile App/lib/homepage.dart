import 'package:flutter/material.dart';
import 'dart:math' as math;

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
 
  String? _selectedFeatureKey;
  final List<CarIssue> _issues = const [
    CarIssue(title: 'Low Tire Pressure', detail: 'Front-left tire at 27 PSI (recommended 32).'),
    CarIssue(title: 'Oil Change Due Soon', detail: 'Approximately 400 miles remaining to recommended interval.'),
  ];
  final List<String> _weatherAlerts = [
    'Light rain expected in 45 minutes.',
    'Road surface temperature dropping near freezing tonight.'
  ];

  void _selectFeature(String key) {
    setState(() {
      _selectedFeatureKey = (_selectedFeatureKey == key) ? null : key;
    });
  }

  @override
  Widget build(BuildContext context) {
    return  SafeArea(
        child: Stack(
          children: [
            SingleChildScrollView(
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      'Your Driving Score',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 2,
                        fontFamily: 'SF_Pro',
                      ),
                    ),
                    PalloydScoreGauge(score: 85),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        EcoDrivingButton(onTap: () => _selectFeature('eco')),
                        const SizedBox(width: 16),
                        VehicleHealthButton(onTap: () => _selectFeature('vehicle')),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        MapButton(onTap: () => _selectFeature('map')),
                        const SizedBox(width: 16),
                        WeatherAlertButton(onTap: () => _selectFeature('weather')),
                      ],
                    ),
                    const SizedBox(height: 40),
                  ],
                ),
              ),
            ),
            if (_selectedFeatureKey != null && _selectedFeatureKey != 'map') ...[
              Positioned.fill(
                child: GestureDetector(
                  onTap: () => _selectFeature(_selectedFeatureKey!),
                  child: Container(
                    color: Colors.black.withOpacity(0.55),
                  ),
                ),
              ),
              Center(
                child: _OverlayFeaturePanel(
                  featureKey: _selectedFeatureKey!,
                  issues: _issues,
                  weatherAlerts: _weatherAlerts,
                  onClose: () => _selectFeature(_selectedFeatureKey!),
                ),
              ),
            ],
          ],
        ),
      )
    ;
  }
}


class EcoDrivingButton extends StatelessWidget {
  final VoidCallback? onTap;
  const EcoDrivingButton({super.key, this.onTap});

  @override
  Widget build(BuildContext context) {
    final content = Container(
      width: 140,
      height: 110,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFF3C5568),
            Color(0xFF243744),
          ],
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.25),
            blurRadius: 20,
            offset: const Offset(0, 8),
          )
        ],
      ),
      child: const Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.eco, color: Color(0xFF9BD9B6), size: 40),
          SizedBox(height: 10),
          Text(
            'Eco-Driving',
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w500,
              fontFamily: 'SF_Pro',
            ),
          ),
        ],
      ),
    );
    if (onTap == null) return content;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: onTap,
        child: content,
      ),
    );
  }
}


class CarIssue {
  final String title;
  final String detail;
  const CarIssue({required this.title, required this.detail});
}

class _ExpandedFeaturePanel extends StatelessWidget {
  final String? featureKey;
  final List<CarIssue> issues;
  final List<String> weatherAlerts;
  const _ExpandedFeaturePanel({required this.featureKey, required this.issues, required this.weatherAlerts});

  @override
  Widget build(BuildContext context) {
    if (featureKey == null) return const SizedBox.shrink();
    Widget inner;
    switch (featureKey) {
      case 'vehicle':
        inner = _VehicleIssuesContent(issues: issues);
        break;
      case 'weather':
        inner = _WeatherAlertsContent(alerts: weatherAlerts);
        break;
      case 'eco':
        inner = const _EcoTipsContent();
        break;
      default:
        return const SizedBox.shrink();
    }
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      switchInCurve: Curves.easeOutCubic,
      switchOutCurve: Curves.easeInCubic,
      child: Container(
        key: ValueKey(featureKey),
        width: MediaQuery.of(context).size.width * 0.85,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF3C445D), Color(0xFF2A3147)],
          ),
          boxShadow: const [
            BoxShadow(color: Color(0x40000000), blurRadius: 24, offset: Offset(0, 10)),
          ],
        ),
        child: inner,
      ),
    );
  }
}

class _OverlayFeaturePanel extends StatelessWidget {
  final String featureKey;
  final List<CarIssue> issues;
  final List<String> weatherAlerts;
  final VoidCallback onClose;
  const _OverlayFeaturePanel({required this.featureKey, required this.issues, required this.weatherAlerts, required this.onClose});

  @override
  Widget build(BuildContext context) {
    Widget content;
    switch (featureKey) {
      case 'vehicle':
        content = _VehicleIssuesContent(issues: issues);
        break;
      case 'weather':
        content = _WeatherAlertsContent(alerts: weatherAlerts);
        break;
      case 'eco':
        content = const _EcoTipsContent();
        break;
      default:
        content = const SizedBox.shrink();
    }
    final width = MediaQuery.of(context).size.width * 0.88;
    final maxHeight = MediaQuery.of(context).size.height * 0.55;
    return AnimatedScale(
      scale: 1,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeOutCubic,
      child: Container(
        constraints: BoxConstraints(maxWidth: width, maxHeight: maxHeight),
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(26),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF3C445D), Color(0xFF2A3147)],
          ),
          boxShadow: const [
            BoxShadow(color: Color(0x66000000), blurRadius: 34, offset: Offset(0, 14)),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  _titleFor(featureKey),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    fontFamily: 'SF_Pro',
                  ),
                ),
                const Spacer(),
                IconButton(
                  onPressed: onClose,
                  icon: const Icon(Icons.close, color: Colors.white70),
                  splashRadius: 20,
                ),
              ],
            ),
            const Divider(color: Colors.white12, height: 24),
            Flexible(
              child: SingleChildScrollView(
                child: content,
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _titleFor(String key) {
    switch (key) {
      case 'vehicle':
        return 'Vehicle Health';
      case 'weather':
        return 'Weather Alerts';
      case 'eco':
        return 'Eco Driving';
      default:
        return '';
    }
  }
}

class _VehicleIssuesContent extends StatelessWidget {
  final List<CarIssue> issues;
  const _VehicleIssuesContent({required this.issues});

  @override
  Widget build(BuildContext context) {
    if (issues.isEmpty) {
      return const Text('No issues detected. All systems nominal.', style: TextStyle(color: Colors.white70, fontSize: 14, fontFamily: 'SF_Pro'));
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Detected Issues (${issues.length})', style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w600, fontFamily: 'SF_Pro')),
        const SizedBox(height: 8),
        ...issues.map((i) => Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.report_problem, color: Color(0xFFFFC562), size: 18),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(i.title, style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w600, fontFamily: 'SF_Pro')),
                        const SizedBox(height: 4),
                        Text(i.detail, style: const TextStyle(color: Colors.white54, fontSize: 13, fontFamily: 'SF_Pro')),
                      ],
                    ),
                  ),
                ],
              ),
            )),
      ],
    );
  }
}

class _WeatherAlertsContent extends StatelessWidget {
  final List<String> alerts;
  const _WeatherAlertsContent({required this.alerts});

  @override
  Widget build(BuildContext context) {
    if (alerts.isEmpty) {
      return const Text('No significant weather impacts expected.', style: TextStyle(color: Colors.white70, fontSize: 14, fontFamily: 'SF_Pro'));
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Weather Alerts (${alerts.length})', style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w600, fontFamily: 'SF_Pro')),
        const SizedBox(height: 8),
        ...alerts.map((a) => Padding(
              padding: const EdgeInsets.only(bottom: 6),
              child: Row(
                children: [
                  const Icon(Icons.cloud, color: Color(0xFFE3E7F2), size: 18),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(a, style: const TextStyle(color: Colors.white70, fontSize: 13, fontFamily: 'SF_Pro')),
                  ),
                ],
              ),
            )),
      ],
    );
  }
}

class _EcoTipsContent extends StatelessWidget {
  const _EcoTipsContent();
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Text('Eco Driving Tips', style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w600, fontFamily: 'SF_Pro')),
        SizedBox(height: 8),
        Text('- Smooth acceleration and braking', style: TextStyle(color: Colors.white70, fontSize: 13, fontFamily: 'SF_Pro')),
        Text('- Maintain steady highway speeds', style: TextStyle(color: Colors.white70, fontSize: 13, fontFamily: 'SF_Pro')),
        Text('- Avoid unnecessary idling', style: TextStyle(color: Colors.white70, fontSize: 13, fontFamily: 'SF_Pro')),
      ],
    );
  }
}

class MapButton extends StatelessWidget {
  final VoidCallback? onTap;
  const MapButton({super.key, this.onTap});

  @override
  Widget build(BuildContext context) {
    final tile = Container(
      width: 140,
      height: 110,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF3C445D),
            Color(0xFF2A3147),
          ],
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.35),
            blurRadius: 28,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            width: 48,
            height: 40,
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Icon(
                    Icons.map,
                    color: Colors.white,
                    size: 36,
                  ),
                ),
                Positioned(
                  right: -4,
                  bottom: -6,
                  child: Container(
                    width: 20,
                    height: 20,
                    decoration: const BoxDecoration(
                      color: Color(0xFF2ED1B1),
                      shape: BoxShape.circle,
                    ),
                    alignment: Alignment.center,
                    child: const Icon(
                      Icons.navigation,
                      size: 12,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'Map',
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w500,
              fontFamily: 'SF_Pro',
            ),
          ),
        ],
      ),
    );

    if (onTap == null) return tile;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: onTap,
        child: tile,
      ),
    );
  }
}

class VehicleHealthButton extends StatelessWidget {
  final VoidCallback? onTap;
  const VehicleHealthButton({super.key, this.onTap});

  @override
  Widget build(BuildContext context) {
    final tile = Container(
      width: 140,
      height: 110,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF3C445D),
            Color(0xFF2A3147),
          ],
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.35),
            blurRadius: 28,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            width: 48,
            height: 40,
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Icon(
                    Icons.directions_car,
                    color: Colors.white,
                    size: 36,
                  ),
                ),
                Positioned(
                  right: -4,
                  bottom: -6,
                  child: Container(
                    width: 20,
                    height: 20,
                    decoration: const BoxDecoration(
                      color: Color(0xFF2ED1B1),
                      shape: BoxShape.circle,
                    ),
                    alignment: Alignment.center,
                    child: const Icon(
                      Icons.check,
                      size: 12,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'Vehicle Health',
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w500,
              fontFamily: 'SF_Pro',
            ),
          ),
        ],
      ),
    );

    if (onTap == null) return tile;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: onTap,
        child: tile,
      ),
    );
  }
}

class WeatherAlertButton extends StatelessWidget {
  final VoidCallback? onTap;
  const WeatherAlertButton({super.key, this.onTap});

  @override
  Widget build(BuildContext context) {
    final tile = Container(
      width: 140,
      height: 110,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF3C445D),
            Color(0xFF2A3147),
          ],
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.35),
            blurRadius: 28,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            width: 56,
            height: 46,
            child: Stack(
              clipBehavior: Clip.none,
              alignment: Alignment.center,
              children: [
                const Icon(
                  Icons.cloud,
                  color: Color(0xFFE3E7F2),
                  size: 40,
                ),
                const Positioned(
                  right: -2,
                  top: -2,
                  child: Icon(
                    Icons.wb_sunny,
                    size: 14,
                    color: Color(0xFFE3E7F2),
                  ),
                ),
                Positioned(
                  bottom: -6,
                  child: Row(
                    children: [
                      _RainBar(),
                      const SizedBox(width: 6),
                      _RainBar(),
                      const SizedBox(width: 6),
                      _RainBar(short: true),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'Weather Alert',
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w500,
              fontFamily: 'SF_Pro',
            ),
          ),
        ],
      ),
    );

    if (onTap == null) return tile;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: onTap,
        child: tile,
      ),
    );
  }
}

class _RainBar extends StatelessWidget {
  final bool short;
  const _RainBar({this.short = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 3,
      height: short ? 8 : 11,
      decoration: BoxDecoration(
        color: const Color(0xFFD0D6E6).withOpacity(0.9),
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }
}


class PalloydScoreGauge extends StatefulWidget {
  final double score;
  final Duration duration;
  const PalloydScoreGauge({super.key, required this.score, this.duration = const Duration(milliseconds: 1200)});

  @override
  State<PalloydScoreGauge> createState() => _PalloydScoreGaugeState();
}

class _PalloydScoreGaugeState extends State<PalloydScoreGauge> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _anim;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: widget.duration);
    _anim = Tween<double>(begin: 0, end: widget.score.clamp(0, 100)).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutQuart));
    _controller.forward();
  }

  @override
  void didUpdateWidget(covariant PalloydScoreGauge oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.score != widget.score) {
      _anim = Tween<double>(begin: _anim.value, end: widget.score.clamp(0, 100)).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutQuart));
      _controller
        ..reset()
        ..forward();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _anim,
      builder: (context, _) {
        final screenWidth = MediaQuery.of(context).size.width;
        final diameter = screenWidth * 0.75;
        final stroke = 24.0;
        final radius = diameter / 2 - stroke / 2;
        final painterHeight = radius + stroke;
        final totalHeight = painterHeight + radius * 0.35;
        final mainFontSize = diameter * 0.175;
        final slashFontSize = mainFontSize * 0.46;
        final subFontSize = mainFontSize * 0.28;
        final topTextOffset = painterHeight * 0.42;
        final descriptor = _descriptorFor(_anim.value);

        return SizedBox(
          width: diameter,
          height: totalHeight,
          child: Stack(
            alignment: Alignment.topCenter,
            children: [
              CustomPaint(
                size: Size(diameter, painterHeight),
                painter: _PalloydSemiCirclePainter(progress: _anim.value / 100, stroke: stroke),
              ),
              Positioned(
                top: topTextOffset,
                width: diameter,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: _anim.value.toInt().toString(),
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: mainFontSize,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 0.5,
                              fontFamily: 'SF_Pro',
                            ),
                          ),
                          TextSpan(
                            text: '/100',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: slashFontSize,
                              fontWeight: FontWeight.w500,
                              fontFamily: 'SF_Pro',
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: subFontSize * 0.6),
                    Text(
                      descriptor,
                      style: TextStyle(color: Colors.white54, fontSize: subFontSize, fontWeight: FontWeight.w500, letterSpacing: 0.3, fontFamily: 'SF_Pro'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  String _descriptorFor(double score) {
    if (score >= 90) return 'Excellent Driving';
    if (score >= 75) return 'Good Driving';
    if (score >= 60) return 'Fair Driving';
    if (score >= 40) return 'Needs Improvement';
    return 'Poor Driving';
  }
}

class _PalloydSemiCirclePainter extends CustomPainter {
  final double progress;
  final double stroke;
  _PalloydSemiCirclePainter({required this.progress, this.stroke = 24.0});

  @override
  void paint(Canvas canvas, Size size) {
    final width = size.width;
    final height = size.height;
    final radius = height - stroke;
    final center = Offset(width / 2, height);
    final rect = Rect.fromCircle(center: center, radius: radius);

    const start = math.pi;
    const sweepFull = math.pi;

    final trackPaint = Paint()
      ..color = const Color(0xFF222838)
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(rect, start, sweepFull, false, trackPaint);

    final gradient = SweepGradient(
      startAngle: start,
      endAngle: start + sweepFull,
      colors: const [
        Color(0xFF47DFC4),
        Color(0xFF31C5E7),
        Color(0xFF6F5CFB),
        Color(0xFFFF4D67),
      ],
    );
    final progressPaint = Paint()
      ..shader = gradient.createShader(rect)
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(rect, start, sweepFull * progress, false, progressPaint);
  }

  @override
  bool shouldRepaint(covariant _PalloydSemiCirclePainter oldDelegate) => oldDelegate.progress != progress || oldDelegate.stroke != stroke;
}
