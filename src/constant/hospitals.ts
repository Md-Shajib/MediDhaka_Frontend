import { HospitalCardProps } from "@/app/hospitals/_components/HospitalCard";
import { HospitalCarouselItem } from "@/app/hospitals/_components/HospitalCarousel";

export const HospitalData = [
    {
        "id": "1",
        "name": "Dhaka Heart Center",
        "location": "Panthapath, Dhaka",
        "phone": "+8801711223344",
        "email": "info@dhakaheart.com"
    },
    {
        "id": "2",
        "name": "United Hospital",
        "location": "Gulshan 2, Dhaka",
        "phone": "+8801755332211",
        "email": "contact@unitedhospital.com"
    },
    {
        "id": "3",
        "name": "Square Hospital",
        "location": "West Panthapath, Dhaka",
        "phone": "+8801677889900",
        "email": "info@squarehospital.com"
    },
    {
        "id": "4",
        "name": "Popular Diagnostic Center",
        "location": "Dhanmondi, Dhaka",
        "phone": "+8801922445566",
        "email": "support@popular.com"
    },
    {
        "id": "5",
        "name": "LabAid Specialized Hospital",
        "location": "Green Road, Dhaka",
        "phone": "+8801711990088",
        "email": "help@labaid.com"
    }
];

export const hospitalCarouselData: HospitalCarouselItem[] = [
    {
        id: 1,
        name: "Dhaka Heart Center",
        specialty: "Cardiology",
        hospital: "Dhaka Heart Center",
        profile_image: "/images/hospitals/dhaka-heart.jpg",
        address: "Panthapath, Dhaka",
        phone: "+8801711223344",
        email: "info@dhakaheart.com",
        cover_image: "/images/hospitals/dhaka-heart.jpg",
        updated_at: "2025-10-10T12:00:00Z",
    },
    {
        id: 2,
        name: "United Hospital",
        specialty: "Multispecialty",
        hospital: "United Hospital",
        profile_image: "/images/hospitals/united-hospital.jpg",
        address: "Gulshan 2, Dhaka",
        phone: "+8801755332211",
        email: "contact@unitedhospital.com",
        cover_image: "/images/hospitals/united-hospital.jpg",
        updated_at: "2025-09-20T08:30:00Z",
    },
    // ... more items
];


export const hospitalCardData: HospitalCardProps[] = [
    {
        hospital: {
            id: 1,
            name: "Dhaka Heart Center",
            address: "Panthapath, Dhaka",
            phone: "+8801711223344",
            email: "info@dhakaheart.com",
            cover_image: "/images/hospitals/dhaka-heart.jpg",
            updated_at: "2025-10-10T12:00:00Z",
        }
    },
    {
        hospital: {
            id: 2,
            name: "United Hospital",
            address: "Gulshan 2, Dhaka",
            phone: "+8801755332211",
            email: "contact@unitedhospital.com",
            cover_image: "/images/hospitals/united-hospital.jpg",
            updated_at: "2025-09-20T08:30:00Z",
        }
    },
    {
        hospital: {
            id: 3,
            name: "Square Hospital",
            address: "West Panthapath, Dhaka",
            phone: "+8801677889900",
            email: "info@squarehospital.com",
            cover_image: "/images/hospitals/square-hospital.jpg",
            updated_at: "2025-09-25T14:15:00Z",
        }
    },
    {
        hospital: {
            id: 4,
            name: "Popular Diagnostic Center",
            address: "Dhanmondi, Dhaka",
            phone: "+8801922445566",
            email: "support@popular.com",
            cover_image: "/images/hospitals/popular-diagnostic.jpg",
            updated_at: "2025-10-01T10:45:00Z",
        }
    },
    {
        hospital: {
            id: 5,
            name: "LabAid Specialized Hospital",
            address: "Green Road, Dhaka",
            phone: "+8801711990088",
            email: "help@labaid.com",
            cover_image: "/images/hospitals/labaid-specialized.jpg",
            updated_at: "2025-09-28T09:00:00Z",
        }
    },
];

