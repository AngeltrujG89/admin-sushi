import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker, Map,} from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import {Geolocation} from "@capacitor/geolocation"
@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  wayPoints: Array<any> = [];
  constructor(private http:HttpClient) { }
  pointInit!:Marker
  pointDelivery!:Marker
  pointFinished!:Marker
  map!:Map;
  markerDriver: any = null;
  style ="mapbox://styles/mapbox/streets-v11"

  async initMapView(pointInit:any,pointFinished:any){

      this.map = new Map({
        container:"mapa",
        accessToken:environment.mapBoxKey,
        style:this.style,
        center:[pointInit.longitude,pointInit.latitude],
        zoom:20,
        interactive: false,
      })
      await this.addMarkersCustoms([pointInit.longitude,pointInit.latitude,pointFinished.longitude,pointFinished.latitude])
        await  this.loadCoords([pointInit.longitude,pointInit.latitude],[pointFinished.longitude,pointFinished.latitude])

    }

   async  addMarkersCustoms(coords:any) {
      const init = document.createElement('div');
      init.className = 'initMarker';
      const finished = document.createElement('div');
      finished.className = 'finishedMarker';
        this.pointInit =  await new Marker(init).setLngLat([coords[0],coords[1]]).
         addTo(this.map);
         this.pointFinished =  await new Marker(finished).setLngLat([coords[2],coords[3]]).
         addTo(this.map);

    }


    async loadCoords(pointInit:any,pointFinished:any) {

      const url = [
        `https://api.mapbox.com/directions/v5/mapbox/driving/`,
        `${pointInit[0]},${pointInit[1]};${pointFinished[0]},${pointFinished[1]}`,
        `?steps=true&geometries=geojson&access_token=${environment.mapBoxKey}`,
      ].join('');

     await  this.http.get(url).subscribe((res: any) => {

        const data = res.routes[0];
        const route = data.geometry.coordinates;

        this.map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        });


        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': 'red',
            'line-width': 5
          }
        });

        this.wayPoints = route;
        this.map.fitBounds([route[0], route[route.length - 1]], {
          padding: 100
        })

      });


    }
    async createMapSelectUbication(latitud:number=0,longitud:number =0){
      this.map = new Map({
        container:"mapa",
        accessToken:environment.mapBoxKey,
        style:this.style,
        center:[longitud,latitud],
        zoom:13,
      })
      const thiss = this
      this.map.on('idle',function(){
        thiss.map.resize()
        })
    }
  public ubicationPoint!:Marker;
   async addMarket(coords:any=null) {
   
        const init = document.createElement('div');
        init.className = 'initMarker';
        console.log(init);
        
        this.ubicationPoint =  await new Marker(init).setLngLat(coords).
         addTo(this.map);
        console.log(this.ubicationPoint);
        
    }

    async eventMapClick(){
      this.map.on('click', (data:any) => {

         this.ubicationPoint.setLngLat(data.lngLat)

      })
    }

}