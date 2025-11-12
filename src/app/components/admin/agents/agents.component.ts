import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartType, registerables } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, BaseChartDirective],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css'
})
export class AgentsComponent implements OnInit {
  ngOnInit(): void {
    Chart.register(...registerables);
  }

  // Données pour le tableau des agents
  agents = [
    {
      nom: 'Aminata Sow',
      missions: 36,
      tauxValidation: '92%',
      delaiMoyen: '2.1 j',
      tauxRejet: '4%',
      tauxRejetValue: 4,
      score: '4.6/5'
    },
    {
      nom: 'Penda Faye',
      missions: 32,
      tauxValidation: '89%',
      delaiMoyen: '2.6 j',
      tauxRejet: '6%',
      tauxRejetValue: 6,
      score: '4.4/5'
    },
    {
      nom: 'Cheikh Sarr',
      missions: 29,
      tauxValidation: '85%',
      delaiMoyen: '3 j',
      tauxRejet: '8%',
      tauxRejetValue: 8,
      score: '4.1/5'
    },
    {
      nom: 'Moussa Seck',
      missions: 25,
      tauxValidation: '81%',
      delaiMoyen: '3.2 j',
      tauxRejet: '10%',
      tauxRejetValue: 10,
      score: '3.9/5'
    },
    {
      nom: 'Khady Diop',
      missions: 23,
      tauxValidation: '78%',
      delaiMoyen: '3.5 j',
      tauxRejet: '12%',
      tauxRejetValue: 12,
      score: '3.7/5'
    }
  ];

  // Configuration du graphique horizontal pour Top 5 missions
  public topMissionsChartType: ChartType = 'bar';
  public topMissionsChartData: ChartConfiguration['data'] = {
    labels: ['Ibrahima Ndiaye', 'Penda Faye', 'Cheikh Sarr', 'Moussa Seck', 'Khady Diop'],
    datasets: [
      {
        data: [100, 80, 70, 60, 30],
        backgroundColor: '#274B9B',
        barThickness: 30,
      }
    ]
  };

  // Configuration du radar chart pour le profil d'un agent
  public radarChartType: ChartType = 'radar';
  public selectedAgent = 'Penda Faye';
  public radarChartData: ChartConfiguration['data'] = {
    labels: ['Volume', 'Score qualité', 'Rapidité', 'Qualité appli', 'Validation'],
    datasets: [
      {
        data: [80, 90, 70, 85, 75],
        backgroundColor: 'rgba(39, 75, 155, 0.2)',
        borderColor: '#274B9B',
        borderWidth: 2,
        pointBackgroundColor: '#274B9B',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#274B9B'
      }
    ]
  };

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return context.parsed.r.toString();
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          display: true,
          font: {
            size: 11
          },
          color: '#9CA3AF',
          backdropColor: 'transparent'
        },
        grid: {
          color: '#E5E7EB'
        },
        pointLabels: {
          font: {
            size: 11
          },
          color: '#4B4848'
        }
      }
    }
  };

  public topMissionsChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return context.parsed.x + ' missions';
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#F2F5F9'
        },
        ticks: {
          display: true,
          stepSize: 10,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          color: '#6B7280',
          padding: 8
        },
        border: {
          display: false
        }
      },
      y: {
        grid: {
          color: '#F2F5F9'
        },
        ticks: {
          font: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          color: '#4B5563',
          padding: 12,
          align: 'start',
          crossAlign: 'far'
        },
        border: {
          display: false
        }
      }
    }
  };
}
