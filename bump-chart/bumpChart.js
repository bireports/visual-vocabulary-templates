import * as d3 from 'd3';
import gChartcolour from 'g-chartcolour';

export function draw() {
    let rem = 10;
    let yScale = d3.scaleLinear();
    let xScale = d3.scaleTime();
    let seriesNames = [];
    let highlightNames = [];
    let yAxisAlign = 'right';
    let markers = false;
    let columns = true;
    let interpolation = d3.curveMonotoneX;
    const colourScale = d3.scaleOrdinal()
    // .range(gChartcolour.lineWeb)
    .domain(seriesNames);

    function chart(parent) {
        //Your drawing function in here
        const lineData = d3.line()
            .defined(d => d)
            .curve(interpolation)
            .x(d => xScale(d.group) + xScale.bandwidth() / 2)
            .y(d => yScale(d.pos) + yScale.bandwidth() / 2);
            
        parent.append('path')
            .attr('stroke', (d) => {
                if (highlightNames.length > 0 && d.highlightLine === false) {
                    return colourScale.range()[0];
                }
                if (highlightNames.length > 0 && d.highlightLine === true) {
                    console.log(colourScale(d.name));
                    return colourScale(d.name);
                } 
                return colourScale(d.name);
            })
            .attr('opacity', (d) => {
                if (highlightNames.length > 0 && d.highlightLine === false) {
                    return 0.5;
                } return 1;
            })
            .attr('d', d => lineData(d.pathData));

        if (columns) {
            // draw background columns
        }
    }

    chart.yScale = (d) => {
        if (!d) return yScale;
        yScale = d;
        return chart;
    };

    chart.yAxisAlign = (d) => {
        if (!d) return yAxisAlign;
        yAxisAlign = d;
        return chart;
    };

    chart.highlightNames = (d) => {
        if (!d) return highlightNames;
        highlightNames = d;
        return chart;
    };

    chart.seriesNames = (d) => {
        if (typeof d === 'undefined') return seriesNames;
        seriesNames = d;
        return chart;
    };

    chart.xScale = (d) => {
        if (!d) return xScale;
        xScale = d;
        return chart;
    };

    chart.plotDim = (d) => {
        if (!d) return window.plotDim;
        window.plotDim = d;
        return chart;
    };

    chart.rem = (d) => {
        if (!d) return rem;
        rem = d;
        return chart;
    };

    chart.markers = (d) => {
        if (typeof d === 'undefined') return markers;
        markers = d;
        return chart;
    };

    chart.interpolation = (d) => {
        if (!d) return interpolation;
        interpolation = d;
        return chart;
    };

    chart.columns = (d) => {
        if (!d) return columns;
        columns = d;
        return chart;
    }

    chart.colourPalette = (d) => {
        if (!d) return colourScale;
        if (highlightNames.length > 0) {
            if (d === 'social' || d === 'video') {
                colourScale.range(gChartcolour.mutedFirstLineSocial);
            } else if (d === 'webS' || d === 'webM' || d === 'webMDefault' || d === 'webL') {
                colourScale.range(gChartcolour.mutedFirstLineWeb);
            } else if (d === 'print') {
                colourScale.range(gChartcolour.mutedFirstLinePrint);
            }
            return chart;
        }
        if (d === 'social' || d === 'video') {
            colourScale.range(gChartcolour.lineSocial);
        } else if (d === 'webS' || d === 'webM' || d === 'webMDefault' || d === 'webL') {
            colourScale.range(gChartcolour.lineWeb);
        } else if (d === 'print') {
            colourScale.range(gChartcolour.linePrint);
        }
        return chart;
    };

    return chart;
}
