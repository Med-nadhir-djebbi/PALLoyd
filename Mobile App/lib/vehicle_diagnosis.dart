import 'package:flutter/material.dart';

class VehicleDiagnosisPage extends StatefulWidget {
  const VehicleDiagnosisPage({super.key});
  @override
  State<VehicleDiagnosisPage> createState() => _VehicleDiagnosisPageState();
}

class _VehicleDiagnosisPageState extends State<VehicleDiagnosisPage> {
  final Set<String> _expanded = {};

  void _toggle(String id) {
    setState(() {
      if (_expanded.contains(id)) {
        _expanded.remove(id);
      } else {
        _expanded.add(id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final categories = _diagnosisCategories;
    return  ListView.builder(
        padding: const EdgeInsets.fromLTRB(18, 12, 18, 40),
        itemCount: categories.length,
        itemBuilder: (context, i) {
          final c = categories[i];
          final expanded = _expanded.contains(c.id);
          return _ExpandableCategoryCard(
            category: c,
            expanded: expanded,
            onToggle: () => _toggle(c.id),
          );
        },
      );
  }
}

class DiagnosisCategory {
  final String id;
  final String title;
  final String description;
  final IconData icon;
  final Color iconColor;
  final List<VehicleMetric> metrics;
  DiagnosisCategory({required this.id, required this.title, required this.description, required this.icon, required this.iconColor, required this.metrics});
}

class VehicleMetric {
  final String name;
  final String value;
  final String? problem;
  VehicleMetric({required this.name, required this.value, this.problem});
}

final List<DiagnosisCategory> _diagnosisCategories = [
  DiagnosisCategory(
    id: 'fuel',
    title: 'Fuel & Efficiency',
    description: 'Fuel level, consumption patterns, trims and mixture adjustments impacting efficiency and emissions.',
    icon: Icons.local_gas_station,
    iconColor: const Color(0xFF31C5E7),
    metrics: [
      VehicleMetric(name: 'Fuel Level', value: '34 %', problem: 'Low fuel: consider refueling soon'),
      VehicleMetric(name: 'Fuel Pressure', value: '395 kPa'),
      VehicleMetric(name: 'Fuel Type', value: 'Unleaded Petrol'),
      VehicleMetric(name: 'Avg Consumption', value: '7.4 L/100km'),

    ],
  ),
  DiagnosisCategory(
    id: 'systems',
    title: 'Tire & Exterior Systems',
    description: 'Per‑wheel tire pressures, exterior lighting status and washer fluid level for safe operation.',
    icon: Icons.directions_car,
    iconColor: const Color(0xFF47DFC4),
    metrics: [
      VehicleMetric(name: 'Tire FL Pressure', value: '27 PSI', problem: 'Low (recommended 32 PSI)'),
      VehicleMetric(name: 'Tire FR Pressure', value: '32 PSI'),
      VehicleMetric(name: 'Tire RL Pressure', value: '31 PSI'),
      VehicleMetric(name: 'Tire RR Pressure', value: '32 PSI'),
      
      
      
      VehicleMetric(name: 'Washer Fluid Level', value: '18 %', problem: 'Very low – refill soon'),
    ],
  ),
  
  DiagnosisCategory(
    id: 'temp',
    title: 'Temperatures',
    description: 'Thermal profile of key systems ensuring optimal operating ranges and preventing overheating.',
    icon: Icons.thermostat,
    iconColor: const Color(0xFFFF4D67),
    metrics: [
      VehicleMetric(name: 'Engine Coolant', value: '94 °C'),
      VehicleMetric(name: 'Intake Air', value: '31 °C'),
      VehicleMetric(name: 'Oil Temp', value: '102 °C', problem: 'High – verify oil grade & cooling'),
      VehicleMetric(name: 'Transmission Temp', value: '87 °C'),
    ],
  ),
  DiagnosisCategory(
    id: 'electrical',
    title: 'Electrical System',
    description: 'Battery & charging status indicating electrical stability and alternator health.',
    icon: Icons.bolt,
    iconColor: const Color(0xFFE3E7F2),
    metrics: [
      VehicleMetric(name: 'Battery Voltage', value: '12.3 V', problem: 'Below optimal resting voltage (≥12.6V)'),
      VehicleMetric(name: 'Control Module Voltage', value: '13.9 V'),
      VehicleMetric(name: 'Alternator Status', value: 'Charging (OK)'),
    ],
  ),
];

class _ExpandableCategoryCard extends StatelessWidget {
  final DiagnosisCategory category;
  final bool expanded;
  final VoidCallback onToggle;
  const _ExpandableCategoryCard({required this.category, required this.expanded, required this.onToggle});

  @override
  Widget build(BuildContext context) {
    final problems = category.metrics.where((m) => m.problem != null).toList();
    return AnimatedContainer(
      duration: const Duration(milliseconds: 250),
      curve: Curves.easeOutCubic,
      margin: const EdgeInsets.only(bottom: 18),
      padding: const EdgeInsets.fromLTRB(18, 16, 18, 16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(22),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF2D3549), Color(0xFF242B3B)],
        ),
        boxShadow: const [
          BoxShadow(color: Color(0x66000000), blurRadius: 28, offset: Offset(0, 12)),
        ],
        border: Border.all(color: Colors.white10, width: 0.8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 42,
                height: 42,
                decoration: BoxDecoration(
                  color: category.iconColor.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(14),
                ),
                alignment: Alignment.center,
                child: Icon(category.icon, color: category.iconColor, size: 26),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  category.title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 17,
                    fontWeight: FontWeight.w700,
                    fontFamily: 'SF_Pro',
                  ),
                ),
              ),
              if (problems.isNotEmpty)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFF4D67).withOpacity(0.15),
                    borderRadius: BorderRadius.circular(30),
                    border: Border.all(color: const Color(0xFFFF4D67).withOpacity(0.4)),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.warning_amber_rounded, color: Color(0xFFFFC562), size: 18),
                      const SizedBox(width: 4),
                      Text('${problems.length} issue${problems.length == 1 ? '' : 's'}', style: const TextStyle(color: Colors.white70, fontSize: 12, fontFamily: 'SF_Pro')),
                    ],
                  ),
                ),
              IconButton(
                onPressed: onToggle,
                icon: AnimatedRotation(
                  turns: expanded ? 0.5 : 0.0,
                  duration: const Duration(milliseconds: 250),
                  curve: Curves.easeOutCubic,
                  child: const Icon(Icons.keyboard_arrow_right, color: Colors.white70, size: 26),
                ),
                splashRadius: 20,
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            category.description,
            style: const TextStyle(color: Colors.white54, fontSize: 13, height: 1.35, fontFamily: 'SF_Pro'),
          ),
          AnimatedCrossFade(
            firstChild: const SizedBox.shrink(),
            secondChild: Padding(
              padding: const EdgeInsets.only(top: 14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ...category.metrics.map((m) => _MetricRow(metric: m)),
                  if (problems.isNotEmpty) ...[
                    const SizedBox(height: 12),
                    _ProblemSummary(problems: problems),
                  ],
                ],
              ),
            ),
            crossFadeState: expanded ? CrossFadeState.showSecond : CrossFadeState.showFirst,
            sizeCurve: Curves.easeOutCubic,
            duration: const Duration(milliseconds: 250),
          ),
        ],
      ),
    );
  }
}

class _MetricRow extends StatelessWidget {
  final VehicleMetric metric;
  const _MetricRow({required this.metric});

  @override
  Widget build(BuildContext context) {
    final hasIssue = metric.problem != null;
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            hasIssue ? Icons.report_problem : Icons.check_circle,
            color: hasIssue ? const Color(0xFFFFC562) : const Color(0xFF2ED1B1),
            size: 18,
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        metric.name,
                        style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w600, fontFamily: 'SF_Pro'),
                      ),
                    ),
                    Text(
                      metric.value,
                      style: TextStyle(
                        color: hasIssue ? const Color(0xFFFFC562) : Colors.white70,
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        fontFamily: 'SF_Pro',
                      ),
                    ),
                  ],
                ),
                if (hasIssue) ...[
                  const SizedBox(height: 4),
                  Text(
                    metric.problem!,
                    style: const TextStyle(color: Colors.white54, fontSize: 12, fontFamily: 'SF_Pro'),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ProblemSummary extends StatelessWidget {
  final List<VehicleMetric> problems;
  const _ProblemSummary({required this.problems});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF3C445D), Color(0xFF2A3147)],
        ),
        boxShadow: const [
          BoxShadow(color: Color(0x40000000), blurRadius: 20, offset: Offset(0, 8)),
        ],
        border: Border.all(color: Colors.white12, width: 0.7),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.warning_amber_rounded, color: Color(0xFFFFC562), size: 20),
              SizedBox(width: 8),
              Text('Issues Detected', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w600, fontFamily: 'SF_Pro')),
            ],
          ),
          const SizedBox(height: 8),
          ...problems.map((p) => Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Text('• ${p.name}: ${p.problem}', style: const TextStyle(color: Colors.white54, fontSize: 12, fontFamily: 'SF_Pro')),
              )),
          const SizedBox(height: 4),
          const Text('Recommendation: schedule maintenance if issues persist or worsen.', style: TextStyle(color: Colors.white38, fontSize: 11, fontFamily: 'SF_Pro')),
        ],
      ),
    );
  }
}