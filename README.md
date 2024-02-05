
<p align="center">
    <h1 align="center">TURBO</h1>
</p>
<p align="center">
    <em>A car shop webapp based on nextjs</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/ShahSau/turbo?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/ShahSau/turbo?style=flat&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/ShahSau/turbo?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/ShahSau/turbo?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/sharp-99CC00.svg?style=flat&logo=sharp&logoColor=white" alt="sharp">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
    	<img src="https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white" alt="nextjs">
    	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
    	<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB" alt="ExpressJS">
	<img src="https://img.shields.io/badge/i18next-26A69A.svg?style=flat&logo=i18next&logoColor=white" alt="i18next">
	<br>
	<img src="https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens" alt="JWT">
    	<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white" alt="mongodb">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
	<img src="https://img.shields.io/badge/Leaflet-199900.svg?style=flat&logo=Leaflet&logoColor=white" alt="Leaflet">
	<img src="https://img.shields.io/badge/Stripe-008CDD.svg?style=flat&logo=Stripe&logoColor=white" alt="Stripe">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
    	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/zustand-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" alt="zustand">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#📍-overview)
> - [📦 Features](#📦-features)
> - [📂 Repository Structure](#📂-repository-structure)
> - [🧩 Modules](#🧩-modules)
> - [🚀 Getting Started](#🚀-getting-started)
>   - [⚙️ Installation](#⚙️-installation)
>   - [🤖 Running turbo](#🤖-running-turbo)
> - [🛠 Project Roadmap](#🛠-project-roadmap)
> - [📄 License](#📄-license)

---

## 📍 Overview

The Turbo App is a user-friendly and efficient application designed and build with nextjs to simplify the process of renting and managing vehicles. 

---

## 📦 Features

Elevate your platform's functionality with a feature-rich set designed to enhance user experience and empower businesses. Our solution integrates NextAuth for secure Google and GitHub logins, Stripe for seamless payments, and offers multi-currency and multi-language support. Whether you're renting cars, booking car repair services, or selling car equipment, our platform provides a unified and user-friendly experience.

- NextAuth with Google and GitHub Login: 
Secure and efficient authentication with NextAuth, supporting both Google and GitHub logins.

- Multi-Language Support:
Switch between languages effortlessly with support for Finnish, Swedish, English, and German.

- Stripe Integration for Payments:
Streamline transactions with Stripe integration, providing a seamless and secure payment experience for users.

- Multi-Currency Support:
Cater to a global audience with support for multiple currencies.

- Car Rental Services:
Offer a comprehensive car rental solution, allowing users to easily browse, select, and rent vehicles.

- Car Repair Shop Booking:
Facilitate convenient booking of car repair services through your platform. 

- Car Equipment Sales:
Create an additional revenue stream by enabling users to purchase car equipment directly from your platform. 

- All Reserved Cars:
Access a centralized list of all reserved cars, allowing for efficient management and tracking of reservations. 

- All Reserved Services:
Keep track of all booked car repair services, providing a comprehensive overview for both users.

- All Bought Equipments:
Maintain a record of all purchased car equipment. 

- All Advertized Cars:
Keep track of your advertized cars in one centralized location.

- All Offered Services:
Stay organized by accessing a comprehensive overview of all your offered services. 

- All Equipment for Sell:
Keep a record of your sold car equipment with a detailed history.

---

## 📂 Repository Structure

```sh
└── turbo/
    ├── .eslintrc.json
    ├── app
    │   ├── [lang]
    │   │   ├── actions
    │   │   ├── cancel
    │   │   ├── cars
    │   │   ├── components
    │   │   ├── equipmentReservations
    │   │   ├── equipments
    │   │   ├── error.tsx
    │   │   ├── favorites
    │   │   ├── globals.css
    │   │   ├── hooks
    │   │   ├── layout.tsx
    │   │   ├── libs
    │   │   ├── listings
    │   │   ├── loading.tsx
    │   │   ├── not-found.tsx
    │   │   ├── offerEquipments
    │   │   ├── offers
    │   │   ├── page.tsx
    │   │   ├── providers
    │   │   ├── reservations
    │   │   ├── search
    │   │   ├── searchEquipment
    │   │   ├── searchRepair
    │   │   ├── serviceReservations
    │   │   ├── services
    │   │   ├── success
    │   │   ├── trips
    │   │   └── types
    │   └── api
    │       ├── equipment
    │       ├── equipmentReservation
    │       ├── favorites
    │       ├── listings
    │       ├── payment
    │       ├── register
    │       ├── reservations
    │       ├── serviceReservations
    │       └── services
    ├── dictionaries
    │   ├── de.json
    │   ├── en.json
    │   ├── fi.json
    │   └── sv.json
    ├── dictionary.ts
    ├── i18n.config.ts
    ├── middleware.ts
    ├── next-env.d.ts
    ├── next.config.js
    ├── package-lock.json
    ├── package.json
    ├── pages
    │   └── api
    │       └── auth
    ├── postcss.config.js
    ├── prisma
    │   └── schema.prisma
    ├── public
    ├── tailwind.config.js
    └── tsconfig.json
```

---

## 🧩 Modules

<details closed><summary>.</summary>

| File                                                                                  | Summary                                                                                                                                                                                                                     |
| ---                                                                                   | ---                                                                                                                                                                                                                         |
| [middleware.ts](https://github.com/ShahSau/turbo/blob/master/middleware.ts)           | Middleware to swtich languages         |
| [dictionary.ts](https://github.com/ShahSau/turbo/blob/master/dictionary.ts)           | Render language file depending on the chosen language      |
| [tailwind.config.js](https://github.com/ShahSau/turbo/blob/master/tailwind.config.js) | TailwindCSS config file |
| [tsconfig.json](https://github.com/ShahSau/turbo/blob/master/tsconfig.json)           | Typescript config file      |
| [i18n.config.ts](https://github.com/ShahSau/turbo/blob/master/i18n.config.ts)         | Language config file

</details>

<details closed><summary>pages.api.auth</summary>

| File                                                                                             | Summary                                                                                                                                                                                                                                  |
| ---                                                                                              | ---                                                                                                                                                                                                                                      |
| [[...nextauth].ts](https://github.com/ShahSau/turbo/blob/master/pages/api/auth/[...nextauth].ts) | authentication via nextAuth |

</details>

<details closed><summary>prisma</summary>

| File                                                                               | Summary                                                                                                                                                                                                                       |
| ---                                                                                | ---                                                                                                                                                                                                                           |
| [schema.prisma](https://github.com/ShahSau/turbo/blob/master/prisma/schema.prisma) | Schema file of the project |

</details>

<details closed><summary>dictionaries</summary>

| File                                                                         | Summary                                                                                                                                                                                                                       |
| ---                                                                          | ---                                                                                                                                                                                                                           |
| [de.json](https://github.com/ShahSau/turbo/blob/master/dictionaries/de.json) | German language dictionary |
| [sv.json](https://github.com/ShahSau/turbo/blob/master/dictionaries/sv.json) | Swedish language dictionary |
| [en.json](https://github.com/ShahSau/turbo/blob/master/dictionaries/en.json) | English language dictionary |
| [fi.json](https://github.com/ShahSau/turbo/blob/master/dictionaries/fi.json) | Finnish language dictionary |

</details>

<details closed><summary>app.[lang]</summary>

| File                                                                                   | Summary                                                                                                                                                                                                                           |
| ---                                                                                    | ---                                                                                                                                                                                                                               |
| [globals.css](https://github.com/ShahSau/turbo/blob/master/app/[lang]/globals.css)     | Tailwind will swap these directives out at build time with all of its generated CSS   |
| [layout.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/layout.tsx)       | Base layout of the     |
| [error.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/error.tsx)         | Customized 404 page    |
| [loading.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/loading.tsx)     | Loader page| 
[not-found.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/not-found.tsx) | Customized 404 page| 
[page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/page.tsx)           | Homepage of the app    |

</details>

<details closed><summary>app.[lang].components</summary>

| File                                                                                                              | Summary                                                                                                                                                                                                                                              |
| ---                                                                                                               | ---                                                                                                                                                                                                                                                  |
| [Map.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/Map.tsx)                             | Map componenet              |
| [Footer.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/Footer.tsx)                       | Footer of the app           |
| [CategoryBoxRepair.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/CategoryBoxRepair.tsx) | Equipment category component |
| [EmptyState.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/EmptyState.tsx)               | Empty state component        |
| [Button.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/Button.tsx)                       | Button component           |
| [HeartButton.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/HeartButton.tsx)             | Favorite button component       |
| [locale-switcher.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/locale-switcher.tsx)     | Language switcher component   |
| [Avatar.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/Avatar.tsx)                       | Profile pic component            |
| [ClientOnly.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/ClientOnly.tsx)               | Component to remove nextjs hydration error         |
| [Container.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/Container.tsx)                 | Base container component         |
| [CategoryBox.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/CategoryBox.tsx)             | Rent a car category component      |
| [Heading.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/Heading.tsx)                     | Heading component           |
| [Loader.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/Loader.tsx)                       | Loader component            |
| [CityData.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/CityData.tsx)                   | Latitude and longitude data of cities in Finland          |

</details>

<details closed><summary>app.[lang].components.equipments</summary>

| File                                                                                                                               | Summary                                                                                                                                                                                                                                                            |
| ---                                                                                                                                | ---                                                                                                                                                                                                                                                                |
| [EquipmentInfo.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/equipments/EquipmentInfo.tsx)               | Description section of selling equipment card     |
| [EquipmentReservation.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/equipments/EquipmentReservation.tsx) | Equipment buying section of selling equipment card |
| [EquipmentHead.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/equipments/EquipmentHead.tsx)               | Header  of selling equipment card     |
| [EquipmentCard.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/equipments/EquipmentCard.tsx)               | Component to render individual equipment        |

</details>

<details closed><summary>app.[lang].components.navbar</summary>

| File                                                                                                                   | Summary                                                                                                                                                                                                                                                    |
| ---                                                                                                                    | ---                                                                                                                                                                                                                                                        |
| [Categoriesrepair.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/navbar/Categoriesrepair.tsx) | List of all categories of selling items |
| [MenuItem.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/navbar/MenuItem.tsx)                 | Rendering individual nav link        |
| [UserMenu.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/navbar/UserMenu.tsx)                 | User menu component          |
| [Search.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/navbar/Search.tsx)                     | Search button of rental car           |
| [Navbar.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/navbar/Navbar.tsx)                     | Navbar of the app          |
| [SearchRepair.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/navbar/SearchRepair.tsx)         | Search button of selling equipments    |
| [Categories.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/navbar/Categories.tsx)             | List of all categories of car rental      |

</details>

<details closed><summary>app.[lang].components.modals</summary>

| File                                                                                                                     | Summary                                                                                                                                                                                                                                                     |
| ---                                                                                                                      | ---                                                                                                                                                                                                                                                         |
| [SearchModal.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/modals/SearchModal.tsx)             | Search modal of rent a car       |
| [RegisterModal.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/modals/RegisterModal.tsx)         | Sign up modal     |
| [Modal.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/modals/Modal.tsx)                         | Base modal           |
| [RepairModal.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/modals/RepairModal.tsx)             | Car servicing modal      |
| [EquipmentModal.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/modals/EquipmentModal.tsx)       | Selling equipment modal    |
| [RentModal.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/modals/RentModal.tsx)                 | Rent a car modal          |
| [RepairSearchModal.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/modals/RepairSearchModal.tsx) | Car servicing modal |
| [LoginModal.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/modals/LoginModal.tsx)               | Login modal        |

</details>

<details closed><summary>app.[lang].components.inputs</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                                                 |
| ---                                                                                                              | ---                                                                                                                                                                                                                                                     |
| [CitySelect.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/inputs/CitySelect.tsx)       | City select input section   |
| [Counter.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/inputs/Counter.tsx)             | Counter section       |
| [Calendar.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/inputs/Calendar.tsx)           | Calender section      |
| [Input.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/inputs/Input.tsx)                 | Base input section        |
| [ImageUpload.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/inputs/ImageUpload.tsx)     | Image upload section   |
| [CategoryInput.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/inputs/CategoryInput.tsx) | Category input section|
| [SelectInput.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/inputs/SelectInput.tsx)     | Select input section   |

</details>

<details closed><summary>app.[lang].components.services</summary>

| File                                                                                                                   | Summary                                                                                                                                                                                                                                                     |
| ---                                                                                                                    | ---                                                                                                                                                                                                                                                         |
| [ServiceHead.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/services/ServiceHead.tsx)         |  Header section of car service card      |
| [ServiceCategory.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/services/ServiceCategory.tsx) | Category section of car service card  |
| [ServiceCard.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/services/ServiceCard.tsx)         | Component to render individual car service     |
| [ServiceInfo.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/services/ServiceInfo.tsx)         | Description section of car service card      |

</details>

<details closed><summary>app.[lang].components.listings</summary>

| File                                                                                                                         | Summary                                                                                                                                                                                                                                                        |
| ---                                                                                                                          | ---                                                                                                                                                                                                                                                            |
| [ListingReservation.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/listings/ListingReservation.tsx) | Reservation section of rent a car card  |
| [ListingHead.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/listings/ListingHead.tsx)               | Header section of rent a car card         |
| [ListingCategory.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/listings/ListingCategory.tsx)       | Category section of rent a car card    |
| [ListingInfo.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/listings/ListingInfo.tsx)               | Description section of rent a car card         |
| [ListingCard.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/components/listings/ListingCard.tsx)               | Component to render individual rent a car service       |

</details>

<details closed><summary>app.[lang].types</summary>

| File                                                                               | Summary                                                                                                                                                                                                                            |
| ---                                                                                | ---                                                                                                                                                                                                                                |
| [index.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/types/index.ts) | Different kind of type checking |

</details>

<details closed><summary>app.[lang].equipments.[equipmentId]</summary>

| File                                                                                                                        | Summary                                                                                                                                                                                                                                                          |
| ---                                                                                                                         | ---                                                                                                                                                                                                                                                              |
| [EquipmentClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/equipments/[equipmentId]/EquipmentClient.tsx) | Component of individual selling equipment page |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/equipments/[equipmentId]/page.tsx)                       | Individual selling equipment page            |

</details>

<details closed><summary>app.[lang].success</summary>

| File                                                                                 | Summary                                                                                                                                                                                                                              |
| ---                                                                                  | ---                                                                                                                                                                                                                                  |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/success/page.tsx) | Payment success page |

</details>

<details closed><summary>app.[lang].reservations</summary>

| File                                                                                                                  | Summary                                                                                                                                                                                                                                                 |
| ---                                                                                                                   | ---                                                                                                                                                                                                                                                     |
| [ReservationsClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/reservations/ReservationsClient.tsx) | Component to render all future car reservations   |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/reservations/page.tsx)                             | Page to render all future car reservations               |

</details>


<details closed><summary>app.[lang].offerEquipments</summary>

| File                                                                                                               | Summary                                                                                                                                                                                                                                                 |
| ---                                                                                                                | ---                                                                                                                                                                                                                                                     |
| [EqupimentClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/offerEquipments/EqupimentClient.tsx) | Component to render all equipments (seller page)  |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/offerEquipments/page.tsx)                       | Page to render all equipments (seller page)           |

</details>

<details closed><summary>app.[lang].equipmentReservations</summary>

| File                                                                                                                                           | Summary                                                                                                                                                                                                                                                                  |
| ---                                                                                                                                            | ---                                                                                                                                                                                                                                                                      |
| [EquipmentReservationClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/equipmentReservations/EquipmentReservationClient.tsx) | Component to render all equipment reservation          |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/equipmentReservations/page.tsx)                                             | Page to render all equipment reservation                      |

</details>

<details closed><summary>app.[lang].searchEquipment</summary>

| File                                                                                         | Summary                                                                                                                                                                                                                                      |
| ---                                                                                          | ---                                                                                                                                                                                                                                          |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/searchEquipment/page.tsx) | Equipment search page |

</details>

<details closed><summary>app.[lang].offers</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                                       |
| ---                                                                                                     | ---                                                                                                                                                                                                                                           |
| [ServicesClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/offers/ServicesClient.tsx) | Component to render all car service (seller page)  |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/offers/page.tsx)                     | Page to render all car service (seller page)          |

</details>

<details closed><summary>app.[lang].cars</summary>

| File                                                                                          | Summary                                                                                                                                                                                                                                 |
| ---                                                                                           | ---                                                                                                                                                                                                                                     |
| [CarsClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/cars/CarsClient.tsx) | Component to render all rent a car (seller page)  |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/cars/page.tsx)             | Page to render all rent a car (seller page)       |

</details>

<details closed><summary>app.[lang].actions</summary>

| File                                                                                                                     | Summary                                                                                                                                                                                                                                                |
| ---                                                                                                                      | ---                                                                                                                                                                                                                                                    |
| [getListings.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getListings.ts)                         | Get all rent a car from database             |
| [getReservations.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getReservations.ts)                 | Get all the reservations from database         |
| [getEquipments.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getEquipments.ts)                     | Get all the equipments from database           |
| [getServices.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getServices.ts)                         | Get all the services from database              |
| [getFavoriteListings.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getFavoriteListings.ts)         | Get all favorites car from database     |
| [getCurrentUser.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getCurrentUser.ts)                   | Get current user from database           |
| [getEquipmentReservation.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getEquipmentReservation.ts) | Get all the bought equipments from database  |
| [getuserById.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getuserById.ts)                         | Get individual user from database              |
| [getEquipmentById.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getEquipmentById.ts)               | Get individual equipment from database         |
| [getListingById.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getListingById.ts)                   | Get individual car from database           |
| [getServiceById.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getServiceById.ts)                   | Get individual service from database           |
| [getServiceReservation.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/actions/getServiceReservation.ts)     | Get all service reservations from database   |

</details>

<details closed><summary>app.[lang].search</summary>

| File                                                                                | Summary                                                                                                                                                                                                                             |
| ---                                                                                 | ---                                                                                                                                                                                                                                 |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/search/page.tsx) | Car rental search page |

</details>

<details closed><summary>app.[lang].searchRepair</summary>

| File                                                                                      | Summary                                                                                                                                                                                                                                   |
| ---                                                                                       | ---                                                                                                                                                                                                                                       |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/searchRepair/page.tsx) | Car service search page |

</details>

<details closed><summary>app.[lang].cancel</summary>

| File                                                                                | Summary                                                                                                                                                                                                                             |
| ---                                                                                 | ---                                                                                                                                                                                                                                 |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/cancel/page.tsx) | Payment cancellation page|

</details>

<details closed><summary>app.[lang].hooks</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                                           |
| ---                                                                                                              | ---                                                                                                                                                                                                                                               |
| [useRegisterModal.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/hooks/useRegisterModal.ts)         | User registration modal hocks     |
| [useRepairSearchModal.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/hooks/useRepairSearchModal.ts) | Car service modal hocks |
| [useEquipmentModal.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/hooks/useEquipmentModal.ts)       | Buying car equipment modal hocks   |
| [useFavorite.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/hooks/useFavorite.ts)                   | Making a car favorite modal hocks         |
| [useRepairModal.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/hooks/useRepairModal.tsx)           | Car service modal hocks      |
| [useCountries.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/hooks/useCountries.ts)                 | Finland cities modal hocks         |
| [useSearchModal.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/hooks/useSearchModal.ts)             | Car rental search modal hocks       |
| [useLoginModal.ts](https://github.com/ShahSau/turbo/blob/master/app/[lang]/hooks/useLoginModal.ts)               | Login modal hocks        |

</details>

<details closed><summary>app.[lang].providers</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                           |
| ---                                                                                                          | ---                                                                                                                                                                                                                                               |
| [ModalsProvider.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/providers/ModalsProvider.tsx)   | TAuth provider  |
| [ToasterProvider.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/providers/ToasterProvider.tsx) | Toast notification provider|

</details>

<details closed><summary>app.[lang].services.[serviceId]</summary>

| File                                                                                                                | Summary                                                                                                                                                                                                                                                    |
| ---                                                                                                                 | ---                                                                                                                                                                                                                                                        |
| [ServiceClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/services/[serviceId]/ServiceClient.tsx) | Component to render individual car service  |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/services/[serviceId]/page.tsx)                   | Page to render individual car service          |

</details>

<details closed><summary>app.[lang].favorites</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                           |
| ---                                                                                                          | ---                                                                                                                                                                                                                                               |
| [FavoritesClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/favorites/FavoritesClient.tsx) | Component to render favorite cars  |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/favorites/page.tsx)                       | Page to render favorite cars            |

</details>

<details closed><summary>app.[lang].serviceReservations</summary>

| File                                                                                                                                       | Summary                                                                                                                                                                                                                                                               |
| ---                                                                                                                                        | ---                                                                                                                                                                                                                                                                   |
| [ServiceReservationsClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/serviceReservations/ServiceReservationsClient.tsx) | Component to render reserved services |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/serviceReservations/page.tsx)                                           | Page to render reserved services                     |

</details>

<details closed><summary>app.[lang].listings.[listingId]</summary>

| File                                                                                                                | Summary                                                                                                                                                                                                                                                    |
| ---                                                                                                                 | ---                                                                                                                                                                                                                                                        |
| [ListingClient.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/listings/[listingId]/ListingClient.tsx) | Component to render individual car  |
| [page.tsx](https://github.com/ShahSau/turbo/blob/master/app/[lang]/listings/[listingId]/page.tsx)                   | Page to render individual car         |

</details>

<details closed><summary>app.api.payment</summary>

| File                                                                              | Summary                                                                                                                                                                                                                           |
| ---                                                                               | ---                                                                                                                                                                                                                               |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/payment/route.ts) | Payment route |

</details>

<details closed><summary>app.api.equipment</summary>

| File                                                                                | Summary                                                                                                                                                                                                                             |
| ---                                                                                 | ---                                                                                                                                                                                                                                 |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/equipment/route.ts) | Equipment route |

</details>

<details closed><summary>app.api.equipment.[equipmentId]</summary>

| File                                                                                              | Summary                                                                                                                                                                                                                                           |
| ---                                                                                               | ---                                                                                                                                                                                                                                               |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/equipment/[equipmentId]/route.ts) | Individual equipment route|

</details>

<details closed><summary>app.api.reservations</summary>

| File                                                                                   | Summary                                                                                                                                                                                                                                |
| ---                                                                                    | ---                                                                                                                                                                                                                                    |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/reservations/route.ts) | Car reservation route |

</details>

<details closed><summary>app.api.reservations.[reservationId]</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                                                |
| ---                                                                                                    | ---                                                                                                                                                                                                                                                    |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/reservations/[reservationId]/route.ts) | Individual car reservation route |

</details>

<details closed><summary>app.api.equipmentReservation</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                        |
| ---                                                                                            | ---                                                                                                                                                                                                                                            |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/equipmentReservation/route.ts) |  Equipment reservation route |

</details>

<details closed><summary>app.api.services</summary>

| File                                                                               | Summary                                                                                                                                                                                                                            |
| ---                                                                                | ---                                                                                                                                                                                                                                |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/services/route.ts) | Car service route|

</details>

<details closed><summary>app.api.services.[serviceId]</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                        |
| ---                                                                                            | ---                                                                                                                                                                                                                                            |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/services/[serviceId]/route.ts) | Individual car service route |

</details>

<details closed><summary>app.api.favorites.[listingId]</summary>

| File                                                                                            | Summary                                                                                                                                                                                                                                         |
| ---                                                                                             | ---                                                                                                                                                                                                                                             |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/favorites/[listingId]/route.ts) | Favorite cars route|

</details>

<details closed><summary>app.api.serviceReservations</summary>

| File                                                                                          | Summary                                                                                                                                                                                                                                       |
| ---                                                                                           | ---                                                                                                                                                                                                                                           |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/serviceReservations/route.ts) | Service reservation route |

</details>

<details closed><summary>app.api.serviceReservations.[reservationId]</summary>

| File                                                                                                          | Summary                                                                                                                                                                                                                                                       |
| ---                                                                                                           | ---                                                                                                                                                                                                                                                           |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/serviceReservations/[reservationId]/route.ts) | Individual service reservation route|

</details>

<details closed><summary>app.api.register</summary>

| File                                                                               | Summary                                                                                                                                                                                                                            |
| ---                                                                                | ---                                                                                                                                                                                                                                |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/register/route.ts) | Uset registration route |

</details>

<details closed><summary>app.api.listings</summary>

| File                                                                               | Summary                                                                                                                                                                                                                            |
| ---                                                                                | ---                                                                                                                                                                                                                                |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/listings/route.ts) | All cars route |

</details>

<details closed><summary>app.api.listings.[listingId]</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                        |
| ---                                                                                            | ---                                                                                                                                                                                                                                            |
| [route.ts](https://github.com/ShahSau/turbo/blob/master/app/api/listings/[listingId]/route.ts) | Individual car route |

</details>

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **node**: `version >= 18.0.0`

### ⚙️ Installation

1. Clone the turbo repository:

```sh
git clone https://github.com/ShahSau/turbo
```

2. Change to the project directory:

```sh
cd turbo
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running turbo

Use the following command to run turbo:

```sh
npm run dev
```

---

## 🛠 Project Roadmap

- [ ] `►  Cypress Testing`


---

## 📄 License

This project is protected under the MIT License. For more details, refer to the [LICENSE](https://github.com/ShahSau/turbo?tab=MIT-1-ov-file#readme) file.

---

[Top](#)
