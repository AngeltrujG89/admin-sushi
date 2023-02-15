import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { Roles, Status } from 'src/app/enums/sockets.enum';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/service/generic.service';
import { AuthRepo } from 'src/app/shared/repos/auth.repository';
import { Order } from 'src/app/shared/repos/orders.repository';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})

export class ReportesPage implements OnInit {
  Orders:Order[]=[];
  OrderPending:Order[]=[]
  ORderPrepared:Order[]=[]
  OrderAccepting:Order[]=[]
  OrderReady:Order[]=[]
  OrderOnWay:Order[]=[]
  OrderFinalized:Order[]=[];
  AllOrders:Order[]=[];
  Today!:string;
  constructor(
    private genericS:GenericService,
    private toast:ToastrService,
    private userS:AuthRepo
  ) {
  }
  start:string = moment().format()
  end:string =moment().format()
  role=null
  chartOptions!:ChartOptions
  productSeller!:ChartOptions
  ngOnInit() {


   this.userS.auth$.subscribe( (res:any) => {
    this.role = res[0].role;

    const branch = res.role === Roles.ADMIN ? undefined : localStorage.getItem('branch');
    // this.genericS.getAll("orders",{start:moment('01-01'+ new Date().getFullYear(),'DD-MM-YYYY').format()}).subscribe((res: any) => {
    //   console.log(res);
    //   this.chartOrder(res)
    //   this.BestSellerProduct()
    //     this.AllOrders = res.filter((ord:any) => !ord.cancelado);
    //     this.Today = new Date().toISOString().substr(0, 10);
    //     this.orderForToday();
    //     this.order(this.Orders);
    //   })
   })




  }



order(ordenes:Order[]){
  ordenes.forEach( (ord) =>{
    switch (ord.status) {
      case Status.CANCELLED:
        this.OrderFinalized.push(ord)
        break;
        case Status.FINISHED:
        this.OrderFinalized.push(ord)
        break;
        case Status.ONWALK:
        this.OrderOnWay.push(ord)
        break;
        case Status.PREPARING:
          this.OrderPending.push(ord)
        break;
        case Status.ACCEPTED:
          this.OrderAccepting.push(ord)
        break;

      default:

        break;
    }
  })

}



orderForToday(){
  this.Orders = this.AllOrders.filter( o => o.createdAt.toString().substr(0, 10) === new Date().toISOString().substr(0, 10) )

}

total(){
  let total = 0
  this.Orders.forEach( (ord) => {
    total += ord.total
  })
  total =total - ((total *.029) +.3 )
  if(total <0){
    total = 0
  }
return total
}



Products:any = []
BestSellerProduct(){
  this.genericS.getAll("product").subscribe( (res:any)=> {

    const Product:any[] = res.sort((a:any, b:any) => {

        if (a.sold < b.sold) {
        return -1;

        }else return 0

  });
  const sold = []
  const names = []
  const product = Product.slice(0,10)
  if(product.length < 5){
    return
  }
  for( let prod of product){
    sold.push({name:prod.name,data:[prod.sold]})
    names.push(prod.name)
  }
  console.log(sold,names);

  this.productSeller = {
    series: sold,
    chart: {
      height: 350,
      type: "bar"
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top" // top, center, bottom
        }
      }
    },
    dataLabels: {
      enabled: true,

      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"]
      }
    },

    xaxis: {
      categories: names,
      position: "top",
      labels: {
        offsetY: -18
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: {
        enabled: true,
        offsetY: -35
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100]
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        formatter: function(val) {
          return "Solds:" + val;
        }
      }
    },
    title: {
      text: "Products Best Sellers",
      floating: false,
      offsetY: 320,
      align: "center",
      style: {
        color: "#444"
      }
    }
  };
  })
}



chartOrder(order:any[]){

  let
    ene=0,
    feb=0,
    mar=0,
    abr=0,
    may=0,
    jun=0,
    jul=0,
    ags=0,
    sep=0,
    oct=0,
    nov=0,
    dic=0;
    order.forEach( (o:any) => {
      switch (o.createdAt.split('-')[1]) {
        case '01':
          if(o.finalized){

            ene +=o.total;
          }
          break;
          case '02':
            if(o.finalized){

          feb +=o.total;
            }
          break;
          case '03':
            if(o.finalized){

          mar +=o.total;
            }
          break;
          case '04':
            if(o.finalized){

          abr +=o.total;
            }
          break;
          case '05':
            if(o.finalized){

          may +=o.total;
            }
          break;
          case '06':
            if(o.finalized){

          jun +=o.total;
            }
          break;
          case '07':
            if(o.finalized){

          jul +=o.total;
            }
          break;
          case '08':
            if(o.finalized){

          ags +=o.total;
            }
          break;
          case '09':
            if(o.finalized){

          sep +=o.total;
            }
          break;
          case '10':
            if(o.finalized){

          oct +=o.total;
            }
          break;
          case '11':
            if(o.finalized){

              nov +=o.total;
            }
            break;
          case '12':
            if(o.finalized){

              dic +=o.total;
            }
            break;
      }

    })

  this.chartOptions = {
    series: [
      {
        name: "Sale",
        data: [   ene,
          feb,
          mar,
          abr,
          may,
          jun,
          jul,
          ags,
          sep,
          oct,
          nov,
          dic]
      }
    ],
    chart: {
      width:400,
      height: 350,
      type: "bar"
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top" // top, center, bottom
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return "$"+ val ;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"]
      }
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      position: "top",
      labels: {
        offsetY: -18
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: {
        enabled: true,
        offsetY: -35
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100]
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        formatter: function(val) {
          return "$"+ val ;
        }
      }
    },
    title: {
      text: "Monthly Sales",
      floating: false,
      offsetY: 320,
      align: "center",
      style: {
        color: "#444"
      }
    }
  };
}
radialBar:any=null








orders(){
  let total = 0
  // this.genericS.getAll("order",{start:moment(this.start).format(),end:moment(this.end).format()}).subscribe((ordenes: any) => {
  //   const canceled=ordenes.filter((ord:any) =>  ord.cancelado===true);
  //   this.OrderFinalized = ordenes.filter((ord:any) => ord.finalized ===true );

  //   ordenes.forEach( (ord:any) => {
  //      if(ord.finalized){
  //       total+=ord.total
  //      }
  //   })
  //   if(total ===0 && this.OrderFinalized.length===0 && canceled.length===0){
  //     this.toast.error("Orders not found with these parameters")
  //     return
  //   }
  //    this.radialBar = {
  //     series: [this.OrderFinalized.length,canceled.length],
  //     chart: {
  //       height: 350,
  //       type: "radialBar"
  //     },
  //     plotOptions: {
  //       radialBar: {
  //         dataLabels: {
  //           name: {
  //             fontSize: "22px"
  //           },
  //           value: {
  //             fontSize: "16px"
  //           },
  //           total: {
  //             show: true,
  //             label: "Total sales",
  //             formatter: function(w:any) {
  //               return "$" + total;
  //             }
  //           }
  //         }
  //       }
  //     },
  //     labels: ["Finalized", "Canceled"]
  //   };
  //   })

}

}

