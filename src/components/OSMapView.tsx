import React, { forwardRef, useEffect, useRef, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";

export interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export interface Details {
    isGesture: boolean;
}

interface OSMMapViewProps {
    style?: StyleProp<ViewStyle>;
    initialRegion?: Region;
    region?: Region;
    onRegionChangeComplete?: (region: Region, details: Details) => void;
}

const OSMMapView = forwardRef<WebView, OSMMapViewProps>(
    ({ style, initialRegion, region, onRegionChangeComplete }, ref) => {
        const webViewRef = useRef<WebView>(null);
        const [isMapReady, setIsMapReady] = useState(false);

        // Send region to map when it changes externally
        useEffect(() => {
            if (isMapReady && region && webViewRef.current) {
                const message = JSON.stringify({
                    type: "setRegion",
                    data: region,
                });
                webViewRef.current.postMessage(message);
            }
        }, [region, isMapReady]);

        const handleMessage = (event: any) => {
            try {
                const data = JSON.parse(event.nativeEvent.data);
                if (data.type === "regionChange" && onRegionChangeComplete) {
                    onRegionChangeComplete(data.region, { isGesture: true });
                } else if (data.type === "mapReady") {
                    setIsMapReady(true);
                }
            } catch (error) {
                console.error("Error parsing message from WebView:", error);
            }
        };

        const getInitialRegion = () => {
            if (initialRegion) {
                return initialRegion;
            }
            return {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
        };

        const mapHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body, html, #map { height: 100%; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const initialRegion = ${JSON.stringify(getInitialRegion())};
          const zoomLevel = 15;
          
          const map = L.map('map').setView([initialRegion.latitude, initialRegion.longitude], zoomLevel);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);
          
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mapReady' }));
          
          map.on('moveend', function() {
            const center = map.getCenter();
            const bounds = map.getBounds();
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            
            const region = {
              latitude: center.lat,
              longitude: center.lng,
              latitudeDelta: ne.lat - sw.lat,
              longitudeDelta: ne.lng - sw.lng
            };
            
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'regionChange',
              region
            }));
          });
          
          window.addEventListener('message', function(event) {
            const message = JSON.parse(event.data);
            if (message.type === 'setRegion') {
              map.setView([message.data.latitude, message.data.longitude], zoomLevel);
            }
          });
        </script>
      </body>
    </html>
  `;

        return (
            <View style={[{ flex: 1 }, style]} className="w-full h-full">
                <WebView
                    ref={webViewRef}
                    source={{ html: mapHTML }}
                    onMessage={handleMessage}
                    geolocationEnabled={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                />
            </View>
        );
    },
);

export default OSMMapView;
