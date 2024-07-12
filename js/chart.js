

let xPosition = 0;
let yPosition = 0;

Chart.Tooltip.positioners.myCustomPositioner = function(elements, eventPosition) {
    if (!elements.length) {
        return false;
    }
    const element = elements[0];
    const x = eventPosition.x;
    const y = eventPosition.y;
    xPosition = x;
    yPosition = y;
    
    const offsetY = 10; // Adjust this value to set the desired distance above the point
    
    return {
        x: x,
        y: y - offsetY
    };
};

const highlightGridLinePlugin = {
    id: 'highlightGridLine',
    afterDatasetsDraw(chart) {
        const xAxis = chart.scales['x'];
        const yAxis = chart.scales['y'];
        const ctx = chart.ctx;

        if (chart.hoveredX !== undefined) {
            const x = chart.hoveredX;
            const hoveredTick = xAxis.getTicks().find(tick => tick.label === chart.hoveredLabel);
            const xTick = hoveredTick ? hoveredTick.value : x;
            
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(xTick, yAxis.top);
            ctx.lineTo(xTick, yAxis.bottom);
            ctx.lineWidth = 1; // Highlighted grid line width
            ctx.strokeStyle = 'indigo'; // Highlighted grid line color
            ctx.stroke();
            ctx.restore();
        }
    }
};

const data = {
    datasets: [ {
        label: 'WPPOOL',
        data: [
            {x: '2023-01-01', y: 10},
            {x: '2023-01-25', y: 15},
            {x: '2023-02-05', y: 20},
            {x: '2023-02-10', y: 25},
            {x: '2023-02-20', y: 30},
            {x: '2023-03-15', y: 35},
            {x: '2023-04-25', y: 40},
            {x: '2023-04-30', y: 45},
            {x: '2023-05-15', y: 50},
            {x: '2023-06-11', y: 60},
            {x: '2023-07-15', y: 70}
        ],
        borderColor: 'red',
        backgroundColor: 'red',
    },{
        label: 'Google',
        data: [
            {x: '2023-01-01', y: 10},
            {x: '2023-01-25', y: 5},
            {x: '2023-02-05', y: 20},
            {x: '2023-02-10', y: 25},
            {x: '2023-02-20', y: 10},
            {x: '2023-03-15', y: 5},
            {x: '2023-04-25', y: 40},
            {x: '2023-04-30', y: 5},
            {x: '2023-05-15', y: 50},
            {x: '2023-06-11', y: 90},
            {x: '2023-07-15', y: 70}
        ],
        fill: false,
        borderColor: 'blue',
        backgroundColor: 'blue',
    },{
        label: 'Microsoft',
        data: [
            {x: '2023-01-01', y: 15},
            {x: '2023-01-25', y: 5},
            {x: '2023-02-05', y: 28},
            {x: '2023-02-10', y: 23},
            {x: '2023-02-20', y: 13},
            {x: '2023-03-15', y: 54},
            {x: '2023-04-25', y: 49},
            {x: '2023-04-30', y: 85},
            {x: '2023-05-15', y: 57},
            {x: '2023-06-11', y: 39},
            {x: '2023-07-15', y: 79}
        ],
        fill: false,
        borderColor: '#AFCD80',
        backgroundColor: '#AFCD80',
    },{
        label: 'twitter',
        data: [
            {x: '2023-01-01', y: 20},
            {x: '2023-02-01', y: 5},
            {x: '2023-02-05', y: 23},
            {x: '2023-02-10', y: 45},
            {x: '2023-02-20', y: 10},
            {x: '2023-03-15', y: 5},
            {x: '2023-04-25', y: 20},
            {x: '2023-04-30', y: 52},
            {x: '2023-05-15', y: 30},
            {x: '2023-06-11', y: 80},
            {x: '2023-07-15', y: 87}
        ],
        fill: false,
        borderColor: 'indigo',
        backgroundColor: 'indigo',
    }]
};

const config = {
    type: 'line',
    
    data: data,
    options: {
        responsive:true,
        elements: {
            point: {
                radius: 3,
                hoverRadius: 5
            },
            line: {
                borderWidth: 2,
            }
        },
        interaction: {
            mode: 'index',
        },
        // responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month',
                    tooltipFormat: 'MMM yyyy',
                    displayFormats: {
                        month: 'MMM'
                    }
                },
                ticks: {
                    source: 'auto',
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0,
                    
                },
                grid: {
                    display: false  // Show vertical grid lines
                },
            },
            y: {
                beginAtZero: true,
                min: -10,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';  // Format as percentage
                    }
                },
                
            }
        },
        plugins: {
            legend:{
                position:'bottom',
                labels:{
                    boxWidth:8,
                    boxHeight:7,
                    padding:20
                }
            },
            highlightGridLine: {},
            tooltip: {
                
                enabled: true,
                xAlign: 'center',
                yAlign: 'bottom',
                backgroundColor: 'white',
                titleColor: 'black',
                bodyColor: 'black',
                padding: 10,
                caretSize: 0,
                borderColor: 'indigo',
                borderWidth: '2',
                boxPadding: 10,
                titleFont: {
                    weight: 900,
                    size: 16,
                    lineHeight: 1.5
                },
                bodyFont: {
                    size: 14,
                    lineHeight: 1.3,
                    weight: 600
                },
                position: 'myCustomPositioner'
            }
        },
        onHover: function(event, elements) {
            const chart = this;
            if (elements.length > 0) {
                const firstElement = elements[0];
                const xValue = firstElement.element.x; // Get the x pixel value directly
                const hoveredLabel = firstElement.element.$context.raw.x;
                chart.hoveredX = xValue; // Store the hovered X position in chart instance
                chart.hoveredLabel = hoveredLabel;
            } else {
                chart.hoveredX = undefined;
                chart.hoveredLabel = undefined;
            }
            chart.update(); // Trigger chart update to draw the vertical line
        }
    },
    plugins: [highlightGridLinePlugin]
};
const myChart=document.getElementById('myChart');
const chart=new Chart(myChart, config);





