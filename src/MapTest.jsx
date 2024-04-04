import React, { useEffect, useRef } from "react";

import { Map as OlMap, View } from "ol";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat, get as getProjection } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { XYZ, Vector as VectorSource } from "ol/source";
import "ol/ol.css";

export default function MapTest(){
    const mapContent = useRef(null);

    const initVectorLayer = new VectorLayer({
        source: new VectorSource(),
    });
    useEffect(()=>{
        if (!mapContent.current){
            return;
        }
        const map = new OlMap({
            controls: defaultControls({zoom: false, rotate: false}).extend([]),
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url:"https://api.vworld.kr/req/wmts/1.0.0/D98ED004-263A-33BD-B98C-6569811966A9/Base/{z}/{y}/{x}.png"
                        // url:"https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
                    }),
                }),
                initVectorLayer,
            ],
            view: new View({
                projection: getProjection("EPSG:3857"),
                center: fromLonLat([129.080278, 35.231489]),
                zoom: 7,
                minZoom: 1,
                maxZoom: 20,
            }),
            target: mapContent.current,
        });
        return () => map.setTarget(undefined);
    }, []);
    return (
        <div>
            <div ref={mapContent} className="w-full h-screen"></div>
        </div>
    )
}