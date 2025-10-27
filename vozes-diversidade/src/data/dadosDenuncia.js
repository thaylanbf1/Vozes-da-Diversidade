export const dashboarData = {
    totalReports: 1333,
    crescMensal: 12.5,
    casosCriticos: 99,
    casosResolvidos: 25,
    avaregeResponseTime: '48h',

    reportsPorTipo:[
        {type: 'Violência Física', count: 222, percentage: 25.4, color: '#ef4444'},
        {type: 'Violência Psicológica', count: 335, percentage: 55.7, color: '#f59e0b'},
        {type: 'Discriminação', count: 272, percentage: 21.7, color: '#8b5cf6'},
        {type: 'Assédio', count: 156, percentage: 14.8, color: '#ec4899'},
        {type: 'Ameaça', count: 47, percentage: 7.8, color: '#f97316'},
    ],

    reportsPorMes: [
      { month: 'Jan', reports: 89, support: 67 },
      { month: 'Fev', reports: 95, support: 71 },
      { month: 'Mar', reports: 102, support: 78 },
      { month: 'Abr', reports: 98, support: 75 },
      { month: 'Mai', reports: 115, support: 89 },
      { month: 'Jun', reports: 123, support: 94 },
      { month: 'Jul', reports: 108, support: 82 },
      { month: 'Ago', reports: 134, support: 102 },
      { month: 'Set', reports: 127, support: 97 },
      { month: 'Out', reports: 142, support: 109 },
      { month: 'Nov', reports: 156, support: 118 },
      { month: 'Dez', reports: 158, support: 124 }
    ],

    reportsPorCidade: [
      { city: 'Belém', reports: 412, critical: 45 },
      { city: 'Ananindeua', reports: 298, critical: 28 },
      { city: 'Santarém', reports: 187, critical: 12 },
      { city: 'Marabá', reports: 156, critical: 8 },
      { city: 'Castanhal', reports: 134, critical: 6 },
      { city: 'Outros', reports: 60, critical: 2 }
    ],

    // ageGroups: [
    //   { range: '13-17 anos', count: 156, percentage: 12.5 },
    //   { range: '18-24 anos', count: 398, percentage: 31.9 },
    //   { range: '25-34 anos', count: 387, percentage: 31.0 },
    //   { range: '35-44 anos', count: 198, percentage: 15.9 },
    //   { range: '45+ anos', count: 108, percentage: 8.7 }
    // ],

    supportRequested: {
      psychological: 567,
      legal: 423,
      social: 312,
      none: 245
    },

    peakHours: [
      { hour: '8h-12h', count: 234 },
      { hour: '12h-18h', count: 456 },
      { hour: '18h-22h', count: 389 },
      { hour: '22h-8h', count: 168 }
    ]

}