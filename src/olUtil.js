import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import CircleStyle from "ol/style/Circle";

export let styles, styleFunction;

let image = new CircleStyle({
    radius: 1,
    fill: null,
    stroke: new Stroke({color: 'red', width: 1}),
});

styles = {
    'Point': new Style({
        image: image,
    }),
    'LineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1,
        }),
    }),
    'MultiLineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1,
        }),
    }),
    'MultiPoint': new Style({
        image: image,
    })
};

styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};
