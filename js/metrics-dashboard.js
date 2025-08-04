// ========================================
// CYVIAN - Metrics Dashboard
// Sistema de métricas en tiempo real
// ========================================

class MetricsDashboard {
    constructor() {
        this.metrics = {
            threatsBlocked: 45892,
            activeMonitors: 1247,
            responseTime: 12,
            uptime: 99.97,
            packetsAnalyzed: 8749283,
            falsePositives: 0.02
        };
        
        this.charts = {};
        this.updateInterval = 5000; // 5 segundos
        this.init();
    }
    
    init() {
        // Inicializar contadores
        this.initCounters();
        
        // Inicializar gráficos si existen
        this.initCharts();
        
        // Comenzar actualizaciones
        this.startUpdates();
        
        // WebSocket simulado para actualizaciones en tiempo real
        this.simulateRealTimeData();
    }
    
    initCounters() {
        // Animar números al cargar
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            this.animateCounter(counter, 0, target, 2000);
        });
    }
    
    animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = this.formatNumber(Math.floor(current));
        }, 16);
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    initCharts() {
        // Gráfico de amenazas en tiempo real
        const threatsChart = document.getElementById('threats-chart');
        if (threatsChart) {
            this.createThreatChart(threatsChart);
        }
        
        // Gráfico de tiempo de respuesta
        const responseChart = document.getElementById('response-chart');
        if (responseChart) {
            this.createResponseChart(responseChart);
        }
        
        // Mapa de ataques
        const attackMap = document.getElementById('attack-map');
        if (attackMap) {
            this.createAttackMap(attackMap);
        }
    }
    
    createThreatChart(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        
        // Datos simulados
        const data = [];
        for (let i = 0; i < 50; i++) {
            data.push(Math.random() * 100 + 50);
        }
        
        // Dibujar gráfico simple
        ctx.strokeStyle = '#00acc1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const stepX = width / data.length;
        data.forEach((value, index) => {
            const x = index * stepX;
            const y = height - (value / 150) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Guardar referencia
        this.charts.threats = { canvas, ctx, data };
    }
    
    createResponseChart(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        
        // Crear gráfico de barras
        const data = [12, 15, 11, 13, 10, 14, 12];
        const barWidth = width / data.length * 0.8;
        const maxValue = Math.max(...data);
        
        ctx.fillStyle = '#1a237e';
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * height * 0.8;
            const x = index * (width / data.length) + (width / data.length - barWidth) / 2;
            const y = height - barHeight;
            
            ctx.fillRect(x, y, barWidth, barHeight);
        });
        
        this.charts.response = { canvas, ctx, data };
    }
    
    createAttackMap(container) {
        // Simulación simple de mapa de ataques
        const attacks = [
            { from: 'China', to: 'Chile', type: 'DDoS' },
            { from: 'Russia', to: 'Chile', type: 'Malware' },
            { from: 'USA', to: 'Chile', type: 'Scan' }
        ];
        
        // Crear elementos para mostrar ataques
        attacks.forEach((attack, index) => {
            setTimeout(() => {
                const attackEl = document.createElement('div');
                attackEl.className = 'attack-notification';
                attackEl.innerHTML = `
                    <i class="fas fa-shield-alt"></i>
                    <span>Bloqueado: ${attack.type} desde ${attack.from}</span>
                `;
                container.appendChild(attackEl);
                
                setTimeout(() => attackEl.remove(), 5000);
            }, index * 2000);
        });
    }
    
    startUpdates() {
        setInterval(() => {
            this.updateMetrics();
        }, this.updateInterval);
    }
    
    updateMetrics() {
        // Actualizar amenazas bloqueadas
        this.metrics.threatsBlocked += Math.floor(Math.random() * 10) + 1;
        const threatsEl = document.getElementById('threats-counter');
        if (threatsEl) {
            threatsEl.textContent = this.formatNumber(this.metrics.threatsBlocked);
        }
        
        // Actualizar tiempo de respuesta
        this.metrics.responseTime = 10 + Math.floor(Math.random() * 8);
        const responseEl = document.getElementById('response-time');
        if (responseEl) {
            responseEl.textContent = `${this.metrics.responseTime}ms`;
        }
        
        // Actualizar paquetes analizados
        this.metrics.packetsAnalyzed += Math.floor(Math.random() * 1000) + 500;
        const packetsEl = document.getElementById('packets-analyzed');
        if (packetsEl) {
            packetsEl.textContent = this.formatNumber(this.metrics.packetsAnalyzed);
        }
        
        // Actualizar gráficos
        this.updateCharts();
    }
    
    updateCharts() {
        // Actualizar gráfico de amenazas
        if (this.charts.threats) {
            const { ctx, data, canvas } = this.charts.threats;
            
            // Agregar nuevo dato
            data.push(Math.random() * 100 + 50);
            data.shift();
            
            // Limpiar y redibujar
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Gradient de fondo
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(0, 172, 193, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 172, 193, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            
            const stepX = canvas.width / data.length;
            data.forEach((value, index) => {
                const x = index * stepX;
                const y = canvas.height - (value / 150) * canvas.height;
                
                if (index === 0) {
                    ctx.moveTo(x, canvas.height);
                    ctx.lineTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.lineTo(canvas.width, canvas.height);
            ctx.closePath();
            ctx.fill();
            
            // Línea
            ctx.strokeStyle = '#00acc1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            data.forEach((value, index) => {
                const x = index * stepX;
                const y = canvas.height - (value / 150) * canvas.height;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
        }
    }
    
    simulateRealTimeData() {
        // Simular alertas en tiempo real
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.showAlert();
            }
        }, 10000);
    }
    
    showAlert() {
        const alerts = [
            { type: 'warning', message: 'Intento de acceso no autorizado bloqueado', icon: 'fa-exclamation-triangle' },
            { type: 'success', message: 'Malware detectado y eliminado', icon: 'fa-shield-alt' },
            { type: 'info', message: 'Escaneo de vulnerabilidades completado', icon: 'fa-info-circle' },
            { type: 'danger', message: 'Ataque DDoS mitigado exitosamente', icon: 'fa-ban' }
        ];
        
        const alert = alerts[Math.floor(Math.random() * alerts.length)];
        const alertEl = document.createElement('div');
        alertEl.className = `security-alert alert-${alert.type}`;
        alertEl.innerHTML = `
            <i class="fas ${alert.icon}"></i>
            <div class="alert-content">
                <strong>${alert.type.toUpperCase()}</strong>
                <p>${alert.message}</p>
            </div>
            <span class="alert-time">${new Date().toLocaleTimeString()}</span>
        `;
        
        const container = document.getElementById('alerts-container');
        if (container) {
            container.insertBefore(alertEl, container.firstChild);
            
            // Remover alertas antiguas
            const alerts = container.querySelectorAll('.security-alert');
            if (alerts.length > 5) {
                alerts[alerts.length - 1].remove();
            }
        }
    }
    
    // Método para portal de clientes
    generateClientReport() {
        const report = {
            period: 'Últimos 30 días',
            summary: {
                threatsBlocked: this.metrics.threatsBlocked,
                uptime: this.metrics.uptime,
                incidents: 0,
                falsePositives: this.metrics.falsePositives
            },
            topThreats: [
                { name: 'SQL Injection', count: 234, severity: 'high' },
                { name: 'XSS Attempts', count: 189, severity: 'medium' },
                { name: 'Brute Force', count: 156, severity: 'high' },
                { name: 'Port Scanning', count: 98, severity: 'low' }
            ],
            recommendations: [
                'Actualizar política de contraseñas',
                'Implementar 2FA en todos los accesos',
                'Revisar permisos de aplicaciones'
            ]
        };
        
        return report;
    }
}

// Inicializar dashboard cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.metricsDashboard = new MetricsDashboard();
    });
} else {
    window.metricsDashboard = new MetricsDashboard();
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MetricsDashboard;
}