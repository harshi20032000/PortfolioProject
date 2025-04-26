import { Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

export const CONSTANTS = {
  colors: {
    GRAY: '#808080',
    BLUE: '#0000FF',
    RED: '#FF0000',
    GREEN: '#00FF00',
    'SEA GREEN': '#2E8B57',
  },

  subscriptionText:
    'Help us reach you with the latest updates on our amazing products by providing us with your email.',

  phoneNumber: '919831317367',
  salesDepartmentNumber1: '9007704148',
  salesDepartmentNumber2: '9831317367',
  facebookID: 'https://facebook.com/Movestoneservicespvtltd',
  instagramID: 'https://instagram.com/movestoneevehicle',
  addProduct: '/admin/add-product',
  productItems: [
    {
      id: 'eRikshaw',
      name: 'E Rikshaw',
    },
    {
      id: 'loader',
      name: 'Loader',
    },
  ],

  officeLocation: {
    headOffice:
      'Ground Floor, 24/1,Shop No. - 6, Shantikunj, Onkarmal Jatia Road, Howrah, West Bengal, 711103',

    corporateOffice:
      'Unit No- 01, 16th Floor, IMAGINE TECH PARK, Block- DP, Sector-V, College More, Salt Lake, Kolkata - 700091',
    factory:
      'Unit No. - UTA0045,0044,0036,0035, Utsab Park, Bhagabatipur, Chatur Bhujkhati, Sankrail, Howrah, West Bengal, PIN - 711313',
  },

  vehicleConfig: {
    modules: [Navigation, Pagination],
    autoHeight: false,
    pagination: {
      clickable: true,
      dynamicBullets: false,
    },
    initialSlide: 0,
    speed: 1000,
    spaceBetween: 50,
    slidesPerView: 3,
    slidesPerGroup: 1,
    direction: 'horizontal',
    loop: false,
    grabCursor: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
        slidesPerGroup: 1,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 32,
        slidesPerGroup: 1,
      },
    },
  } as SwiperOptions,

  bannerConfig: {
    modules: [Navigation],
    autoHeight: false,
    pagination: false,
    centeredSlidesBounds: false,
    centeredSlides: false,
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 0,
    direction: 'horizontal',
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 2000,
    loop: true,
    grabCursor: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        navigation: {
          nextEl: '#carousel-right-button',
          prevEl: '#carousel-left-button',
        },
      },
      768: {
        slidesPerView: 1,
        navigation: {
          nextEl: '#carousel-right-button',
          prevEl: '#carousel-left-button',
        },
      },
      991: {
        slidesPerView: 1,
        navigation: {
          nextEl: '#carousel-right-button',
          prevEl: '#carousel-left-button',
        },
      },
    },
  } as SwiperOptions,

  productConfig: {
    autoHeight: false,
    pagination: false,
    centeredSlidesBounds: false,
    centeredSlides: false,
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 0,
    direction: 'horizontal',
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 1000,
    loop: true,
    grabCursor: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      991: {
        slidesPerView: 1,
      },
    },
  } as SwiperOptions,

  testimonialConfig: {
    modules: [Navigation],
    autoHeight: false,
    freeMode: false,
    shortSwipes: false,
    pagination: false,
    centeredSlides: false,
    slidesPerView: 1,
    direction: 'horizontal',
    grabCursor: true,
    navigation: {
      nextEl: '#testimonial-right-button',
      prevEl: '#testimonial-left-button',
    },
  } as SwiperOptions,

  productFeatures: {
    camera: 'CAMERA',
    battery: 'BATTERY',
    bodyDimension: 'BODY DIMENSION',
    breakType: 'BREAK TYPE',
    charger: 'CHARGER',
    controller: 'CONTROLLER',
    converter: 'CONVERTER',
    headLight: 'HEAD LIGHT',
    mileage: 'MILEAGE',
    motor: 'MOTOR',
    rim: 'RIM',
    roof: 'ROOF',
    curtain: 'CURTAIN',
    fan: 'FAN',
    fireExtinguisher: 'FIRE EXTINGUISHER',
    fmSet: 'FM RADIO',
    fogLight: 'FOG LIGHT',
    footMat: 'FOOT MAT',
    jackHandleSet: 'JACKHANDLE SET',
    passengerHandle: 'PASSENGER HANDLE',
    rearShocker: 'REAR SHOCKER',
    sensorLock: 'SENSOR LOCK',
    sideLookingGlass: 'SIDE LOOKING GLASS',
    stepnyCover: 'STEPNY COVER',
    taxiLight: 'TAXI LIGHT',
    toolKit: 'TOOLKIT',
    seatingCapacity: 'SEATING CAPACITY',
    shocker: 'SHOCKER',
    sideCover: 'SIDE COVER',
    tyreDiameter: 'TYRE DIAMETER',
    tyreType: 'TYRE TYPE',
    weightWithoutBattery: 'WEIGHT WITHOUT BATTERY',
    wiper: 'WIPER',
  },

  featuresToOmitInAdmin: {
    colorOptions: true,
    features: true,
    imageURL: true,
    productID: true,
    productName: true,
    productPictureDetails: true,
    visible: true,
    createdAt: true,
    updatedAt: true,
    category: true
  },

  ABOUT_US: [
    '“Move Stone” is a well known Brand of E-Rickshaw in India.',
    'The Company is manufacturing E-Rickshaw since Aug’2020.',
    'We are selling our products in West Bengal, Bihar, Assam, Tripura, Jharkhand, Uttar Pradesh, Chhattisgarh, Madhya Pradesh & Orissa, apart of mentioned states we are planning to supply shortly in Maharashtra & Rajasthan.',
    'We are an iCAT (International Centre for Automation Technology) approved E-rickshaw manufacturing company incorporated with the intention to address the robust growth potential of E-vehicle market in India.',
    'We are manufacturing E-Rickshaw and planning enter in Electric Two-wheeler segment in coming days.',
    'Our manufacturing unit is situated at Utsav Park, Bhagbatipur, Chatur Bhujkathi, Sankrail, Howrah- 711313.',
    'We have an experienced team of engineers for post sales service.',
  ],
};
