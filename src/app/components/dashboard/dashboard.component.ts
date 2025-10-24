import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, SidebarComponent, BaseChartDirective],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public barChartType: ChartType = 'bar';
    public pieChartType: ChartType = 'pie';
    public showAdvancedFilter: boolean = false;

    public barChartData: ChartConfiguration['data'] = {
        labels: ['Valides', 'Expirés', 'En renouvellement'],
        datasets: [
            {
                data: [16, 24, 20],
                backgroundColor: ['#0D823B', '#EF6B64', '#EADAA5'],
                barThickness: 60,
            }
        ]
    };
    public barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#7B8CA6',
                    font: {
                        size: 14,
                        weight: 500
                    }
                }
            },
            y: {
                min: 4, // démarrer l'axe Y à 4 au lieu de 0
                beginAtZero: false,
                grid: {
                    color: '#F2F5F9',
                    drawTicks: false
                },
                border: {
                    display: false
                },
                ticks: {
                    color: '#7B8CA6',
                    stepSize: 4,
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    public pieChartData: ChartConfiguration['data'] = {
        labels: ['En attente', 'En cours', 'Validée', 'Rejetée'],
        datasets: [
            {
                data: [30, 10, 50, 10],
                backgroundColor: ['#E5E7EB', '#EADAA5', '#0D823B', '#EF6B64'],
                borderWidth: 0,
                hoverOffset: 10
            }
        ]
    };

    public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: true,

        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#172B4D',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value}%`;
                    }
                }
            }
        }
    };

    ngOnInit(): void {
        // Enregistrer tous les composants Chart.js
        Chart.register(...registerables);
    }

    toggleAdvancedFilter(): void {
        this.showAdvancedFilter = !this.showAdvancedFilter;
    }

    applyFilters(): void {
        // TODO: Implémenter la logique de filtrage
        console.log('Filtres appliqués');
        this.showAdvancedFilter = false;
    }

    cancelFilters(): void {
        this.showAdvancedFilter = false;
    }
}
