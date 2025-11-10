
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartType, defaults, registerables } from 'chart.js';
import type { ChartConfiguration, TooltipItem, ChartOptions } from 'chart.js';



@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, AdminSidebarComponent, BaseChartDirective],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent {

    public showAdvancedFilter: boolean = false;

    // Bar chart (Répartition par revenus)
    public revenuBarChartType: ChartType = 'bar';
    public revenuBarChartData: ChartConfiguration['data'] = {
        labels: ['Immeuble', 'Hôtel', 'Restaurant', 'Atelier'],
        datasets: [
            {
                data: [120, 110, 90, 80],
                backgroundColor: '#EADAA5',
                barThickness: 32,
                borderSkipped: false,
                base: 10,
            }
        ]
    };
    public revenuBarChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context: any) {
                        return context.parsed.y + 'k';
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { color: '#F2F5F9' },
                ticks: {
                    color: '#6B7280',
                    font: { size: 12, weight: 500 },
                },
            },
            y: {
                beginAtZero: true,
                max: 120,
                grid: { color: '#F2F5F9' },
                border: { display: false },
                ticks: {
                    color: '#6B7280',
                    font: { size: 12 },
                    callback: function (value: any) { return value + 'k'; }
                }
            }
        }
    };
    ngOnInit(): void {
        Chart.register(...registerables);
    }
    // Line chart (Demandes & Certificats)
    public lineChartType: ChartType = 'line';
    public lineChartData: ChartConfiguration['data'] = {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [
            {
                label: 'Demandes',
                data: [10, 17, 16, 22, 20, 25, 21, 23],
                borderColor: '#2388FF',
                backgroundColor: 'rgba(35,136,255,0.08)',
                borderWidth: 1.5,
                fill: true,
                pointBackgroundColor: '#ffff',
                pointBorderColor: '#2388FF',
                pointRadius: 5,

            },
            {
                label: 'Certificats',
                data: [5, 10, 8, 15, 13, 17, 14, 16],
                borderColor: '#11BF6D',
                backgroundColor: 'rgba(17,191,109,0.08)',
                borderWidth: 1.5,
                fill: true,
                pointBackgroundColor: '#ffff',
                pointBorderColor: '#11BF6D',
                pointRadius: 5,

            },
        ],
    };
    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'start',
                labels: {
                    usePointStyle: false,
                    boxWidth: 30,
                    boxHeight: 10,
                    padding: 14,
                    font: {
                        size: 12,
                        family: 'Inter, system-ui, sans-serif'
                    },
                    color: '#172B4D',
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return datasets.map((dataset, i) => ({
                            text: dataset.label || '',
                            fillStyle: 'transparent',
                            strokeStyle: dataset.borderColor as string,
                            lineWidth: 2,
                            lineDash: [5, 5],
                            hidden: !chart.isDatasetVisible(i),
                            datasetIndex: i
                        }));
                    }
                }
            },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                grid: { display: true, color: '#F2F5F9' },
                border: {
                    color: '#F2F5F9'
                },
                title: { display: true, text: '' },
            },
            y: {
                beginAtZero: true,
                grid: { color: '#F2F5F9' },
                border: {
                    color: '#F2F5F9'
                },
                title: { display: true, text: 'Montant en Millions (euro)' },
                ticks: { stepSize: 5 },
                max: 30,
            },
        },
    };

    // Pie chart (Répartition par secteur)
    public pieChartType: ChartType = 'pie';
    public pieChartData: ChartConfiguration['data'] = {
        labels: ['Immobilier', 'Hôtellerie', 'Artisanat', 'Restauration'],
        datasets: [
            {
                data: [22, 12, 44, 8],
                backgroundColor: ['#E5E7EB', '#EADAA5', '#0D823B', '#EF6B64'],
                borderWidth: 0,
                hoverOffset: 10
            },
        ],
    };
    public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'center',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 18,
                    font: {
                        size: 12,
                    },
                    color: '#172B4D',
                    boxWidth: 6,
                    boxHeight: 6
                }
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


