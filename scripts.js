let bikes = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentBikeId = null;
let currentColor = null;

// Dữ liệu sản phẩm
const productsData = [
    // CRUISER
    {
        id: 1,
        name: "Harley-Davidson Street Bob 114",
        price: "399.000.000",
        images: {
            "Đen": "https://cdn.dealerspike.com/imglib/products/harley-showroom/2024/street-bob-114/vivid-black-22.png",
            "Xám": "https://cdn.dealerspike.com/imglib/products/harley-showroom/2024/street-bob-114/industrial-yellow-22.png",
            "Đỏ": "https://cdn.dealerspike.com/imglib/products/harley-showroom/2024/street-bob-114/redline-red-22.png"
        },
        description: "Harley-Davidson Street Bob 114 - Cruiser mạnh mẽ với động cơ V-Twin Milwaukee-Eight 114.",
        brand: "Harley-Davidson",
        category: "Cruiser",
        specs: {
            engine: "1.868 cc (V-Twin)",
            power: "94 mã lực",
            torque: "155 Nm",
            weight: "297 kg"
        },
        features: ["ABS", "Cruise Control", "LED Lighting", "Digital Display"],
        colors: ["Đen", "Xám", "Đỏ"],
        stock: 5
    },
    {
        id: 2,
        name: "Indian Scout Bobber",
        price: "299.000.000",
        images: {
            "Đen": "https://cdn1.polaris.com/globalassets/indian/2024/model/vehicle-cards/scout-bobber.png",
            "Xám": "https://cdn1.polaris.com/globalassets/indian/2024/model/vehicle-cards/scout-bobber-twenty.png",
            "Đỏ": "https://cdn1.polaris.com/globalassets/indian/2024/model/vehicle-cards/scout-bobber-icon.png"
        },
        description: "Indian Scout Bobber - Xe cruiser cổ điển với phong cách bobber hiện đại.",
        brand: "Indian",
        category: "Cruiser",
        specs: {
            engine: "1.133 cc (V-Twin)",
            power: "100 mã lực",
            torque: "98 Nm",
            weight: "252 kg"
        },
        features: ["ABS", "LED Lighting", "Digital Display", "Cruise Control"],
        colors: ["Đen", "Xám", "Đỏ"],
        stock: 3
    },
    {
        id: 3,
        name: "Triumph Rocket 3 R",
        price: "589.000.000",
        images: {
            "Đen": "https://www.triumphmotorcycles.vn/images/bikes/rocket-3/2024/colors/rocket-3-r-black.png",
            "Đỏ": "https://www.triumphmotorcycles.vn/images/bikes/rocket-3/2024/colors/rocket-3-r-red.png",
            "Xám": "https://www.triumphmotorcycles.vn/images/bikes/rocket-3/2024/colors/rocket-3-r-silver.png"
        },
        description: "Triumph Rocket 3 R - Cruiser với động cơ 3 xy-lanh lớn nhất thế giới.",
        brand: "Triumph",
        category: "Cruiser",
        specs: {
            engine: "2.458 cc (3 xy-lanh)",
            power: "165 mã lực",
            torque: "221 Nm",
            weight: "291 kg"
        },
        features: ["Cornering ABS", "Traction Control", "Riding Modes", "TFT Display"],
        colors: ["Đen", "Đỏ", "Xám"],
        stock: 2
    },
    {
        id: 4,
        name: "Suzuki Boulevard M109R B.O.S.S.",
        price: "389.000.000",
        images: {
            "Đen": "https://suzukicycles.com/images/motorcycles/2024/boulevard-m109r-boss/black.png",
            "Xám": "https://suzukicycles.com/images/motorcycles/2024/boulevard-m109r-boss/gray.png",
            "Xanh": "https://suzukicycles.com/images/motorcycles/2024/boulevard-m109r-boss/blue.png"
        },
        description: "Suzuki Boulevard M109R B.O.S.S. - Power cruiser với động cơ V-Twin mạnh mẽ.",
        brand: "Suzuki",
        category: "Cruiser",
        specs: {
            engine: "1.783 cc (V-Twin)",
            power: "128 mã lực",
            torque: "160 Nm",
            weight: "347 kg"
        },
        features: ["Dual Disc Brakes", "LED Lighting", "Digital Instrumentation", "Inverted Fork"],
        colors: ["Đen", "Xám", "Xanh"],
        stock: 4
    },
    {
        id: 5,
        name: "Yamaha Bolt R-Spec",
        price: "219.000.000",
        images: {
            "Đen": "https://yamaha-motor.com/images/motorcycles/2024/bolt-r-spec/black.png",
            "Xám": "https://yamaha-motor.com/images/motorcycles/2024/bolt-r-spec/gray.png",
            "Xanh": "https://yamaha-motor.com/images/motorcycles/2024/bolt-r-spec/blue.png"
        },
        description: "Yamaha Bolt R-Spec - Bobber phong cách với khả năng tùy chỉnh cao.",
        brand: "Yamaha",
        category: "Cruiser",
        specs: {
            engine: "942 cc (V-Twin)",
            power: "54 mã lực",
            torque: "80 Nm",
            weight: "252 kg"
        },
        features: ["Wave Disc Brakes", "Digital Meter", "Remote Reservoir Shocks", "Belt Drive"],
        colors: ["Đen", "Xám", "Xanh"],
        stock: 6
    },
    {
        id: 6,
        name: "Kawasaki Vulcan 1700 Voyager",
        price: "459.000.000",
        images: {
            "Đen": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/2024_Vulcan_1700_Voyager_BK1.png",
            "Xám": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/2024_Vulcan_1700_Voyager_GY1.png",
            "Xanh": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/2024_Vulcan_1700_Voyager_BL1.png"
        },
        description: "Kawasaki Vulcan 1700 Voyager - Cruiser touring đẳng cấp với trang bị tiện nghi.",
        brand: "Kawasaki",
        category: "Cruiser",
        specs: {
            engine: "1.700 cc (V-Twin)",
            power: "82 mã lực",
            torque: "146 Nm",
            weight: "406 kg"
        },
        features: ["ABS", "Electronic Cruise Control", "Advanced Audio System", "Heated Grips"],
        colors: ["Đen", "Xám", "Xanh"],
        stock: 2
    },
    {
        id: 7,
        name: "Honda Rebel 1100",
        price: "249.000.000",
        images: {
            "Đen": "https://powersports.honda.com/-/media/products/family/rebel-1100/2024/2024-rebel-1100-metallic-black-650x380.png",
            "Xanh": "https://powersports.honda.com/-/media/products/family/rebel-1100/2024/2024-rebel-1100-pearl-stallion-brown-650x380.png",
            "Đỏ": "https://powersports.honda.com/-/media/products/family/rebel-1100/2024/2024-rebel-1100-bordeaux-red-metallic-650x380.png"
        },
        description: "Honda Rebel 1100 - Cruiser hiện đại với động cơ parallel-twin mạnh mẽ.",
        brand: "Honda",
        category: "Cruiser",
        specs: {
            engine: "1.084 cc (Parallel-Twin)",
            power: "86 mã lực",
            torque: "98 Nm",
            weight: "223 kg"
        },
        features: ["DCT Option", "Riding Modes", "Honda Selectable Torque Control", "Cruise Control"],
        colors: ["Đen", "Xanh", "Đỏ"],
        stock: 4
    },
    {
        id: 8,
        name: "Indian Chief Dark Horse",
        price: "479.000.000",
        images: {
            "Đen": "https://cdn1.polaris.com/globalassets/indian/2024/model/vehicle-cards/indian-chief-dark-horse-black-smoke.png",
            "Xám": "https://cdn1.polaris.com/globalassets/indian/2024/model/vehicle-cards/indian-chief-dark-horse-titanium-smoke.png",
            "Đỏ": "https://cdn1.polaris.com/globalassets/indian/2024/model/vehicle-cards/indian-chief-dark-horse-ruby-smoke.png"
        },
        description: "Indian Chief Dark Horse - Cruiser mạnh mẽ với phong cách đen huyền bí.",
        brand: "Indian",
        category: "Cruiser",
        specs: {
            engine: "1.890 cc (V-Twin)",
            power: "89 mã lực",
            torque: "162 Nm",
            weight: "304 kg"
        },
        features: ["Ride Command", "3 Riding Modes", "Rear Cylinder Deactivation", "LED Lighting"],
        colors: ["Đen", "Xám", "Đỏ"],
        stock: 3
    },
    {
        id: 9,
        name: "Harley-Davidson Low Rider S",
        price: "499.000.000",
        images: {
            "Đen": "https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2024/2024-low-rider-s/2024-low-rider-s-010/2024-low-rider-s-010-motorcycle.jpg",
            "Xám": "https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2024/2024-low-rider-s/2024-low-rider-s-020/2024-low-rider-s-020-motorcycle.jpg",
            "Xanh": "https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2024/2024-low-rider-s/2024-low-rider-s-030/2024-low-rider-s-030-motorcycle.jpg"
        },
        description: "Harley-Davidson Low Rider S - Performance cruiser với động cơ Milwaukee-Eight 117.",
        brand: "Harley-Davidson",
        category: "Cruiser",
        specs: {
            engine: "1.868 cc (V-Twin)",
            power: "103 mã lực",
            torque: "169 Nm",
            weight: "308 kg"
        },
        features: ["Inverted Front Forks", "Premium Suspension", "Powerful Brakes", "Digital Instrumentation"],
        colors: ["Đen", "Xám", "Xanh"],
        stock: 2
    },
    {
        id: 10,
        name: "Triumph Bonneville Bobber",
        price: "339.000.000",
        images: {
            "Đen": "https://www.triumphmotorcycles.co.uk/images/bikes/bonneville-bobber/2024/colors/bonneville-bobber-black.png",
            "Xanh": "https://www.triumphmotorcycles.co.uk/images/bikes/bonneville-bobber/2024/colors/bonneville-bobber-blue.png",
            "Đỏ": "https://www.triumphmotorcycles.co.uk/images/bikes/bonneville-bobber/2024/colors/bonneville-bobber-red.png"
        },
        description: "Triumph Bonneville Bobber - Bobber phong cách cổ điển với công nghệ hiện đại.",
        brand: "Triumph",
        category: "Cruiser",
        specs: {
            engine: "1.200 cc (Parallel-Twin)",
            power: "76 mã lực",
            torque: "106 Nm",
            weight: "251 kg"
        },
        features: ["Ride-by-Wire", "Riding Modes", "ABS", "Traction Control"],
        colors: ["Đen", "Xanh", "Đỏ"],
        stock: 3
    },
    // Thêm các xe khác tương tự...
    // TOURING
    {
        id: 11,
        name: "BMW K 1600 GTL",
        price: "899.000.000",
        images: {
            "Đen": "https://bmw-motorrad.vn/wp-content/uploads/2023/12/K1600GTL-Black-Storm-2.png",
            "Xám": "https://bmw-motorrad.vn/wp-content/uploads/2023/12/K1600GTL-Grey-1.png",
            "Trắng": "https://bmw-motorrad.vn/wp-content/uploads/2023/12/K1600GTL-White-1.png"
        },
        description: "BMW K 1600 GTL - Touring cao cấp với động cơ 6 xy-lanh thẳng hàng.",
        brand: "BMW",
        category: "Touring",
        specs: {
            engine: "1.649 cc (6 xy-lanh)",
            power: "160 mã lực",
            torque: "180 Nm",
            weight: "350 kg"
        },
        features: ["Dynamic ESA", "Adaptive Headlight", "Audio System 2.0", "Hill Start Control"],
        colors: ["Đen", "Xám", "Trắng"],
        stock: 2
    },
    {
        id: 12,
        name: "Yamaha Star Venture",
        price: "799.000.000",
        images: {
            "Đen": "https://dd5394a0b8ca8e97ba29-abf76f3d91a2125517d6c7c409f095c7.ssl.cf1.rackcdn.com/content/common/Models/2024/f0fb1173-1c4e-4ea4-8c73-4811c451e981.png",
            "Xanh": "https://dd5394a0b8ca8e97ba29-abf76f3d91a2125517d6c7c409f095c7.ssl.cf1.rackcdn.com/content/common/Models/2024/8b8b8173-1c4e-4ea4-8c73-4811c451e982.png",
            "Đỏ": "https://dd5394a0b8ca8e97ba29-abf76f3d91a2125517d6c7c409f095c7.ssl.cf1.rackcdn.com/content/common/Models/2024/9c9c9173-1c4e-4ea4-8c73-4811c451e983.png"
        },
        description: "Yamaha Star Venture - Touring đẳng cấp với công nghệ tiên tiến.",
        brand: "Yamaha",
        category: "Touring",
        specs: {
            engine: "1.854 cc (V-Twin)",
            power: "126 mã lực",
            torque: "170 Nm",
            weight: "437 kg"
        },
        features: ["Sure-Park System", "7-inch Infotainment", "Heated Seats", "Smart Key System"],
        colors: ["Đen", "Xanh", "Đỏ"],
        stock: 3
    },
    {
        id: 13,
        name: "Indian Roadmaster Elite",
        price: "999.000.000",
        images: {
            "Đen": "https://cdn1.polaris.com/globalassets/indian/2024/model/vehicle-cards/roadmaster-elite-thunder-black-azure-crystal.png",
            "Đỏ": "https://cdn1.polaris.com/globalassets/indian/2024/model/vehicle-cards/roadmaster-elite-ruby-smoke.png",
            "Xanh": "https://cdn1.polaris.com/globalassets/indian/2024/model/vehicle-cards/roadmaster-elite-stealth-gray.png"
        },
        description: "Indian Roadmaster Elite - Touring cao cấp với trang bị premium.",
        brand: "Indian",
        category: "Touring",
        specs: {
            engine: "1.890 cc (V-Twin)",
            power: "92 mã lực",
            torque: "171 Nm",
            weight: "421 kg"
        },
        features: ["Ride Command with Navigation", "Premium Audio", "Heated Seats & Grips", "LED Lighting"],
        colors: ["Đen", "Đỏ", "Xanh"],
        stock: 2
    },
    {
        id: 14,
        name: "Harley-Davidson Ultra Limited",
        price: "899.000.000",
        images: {
            "Đen": "https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2024/2024-ultra-limited/2024-ultra-limited-010/2024-ultra-limited-010-motorcycle.jpg",
            "Xanh": "https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2024/2024-ultra-limited/2024-ultra-limited-020/2024-ultra-limited-020-motorcycle.jpg",
            "Đỏ": "https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2024/2024-ultra-limited/2024-ultra-limited-030/2024-ultra-limited-030-motorcycle.jpg"
        },
        description: "Harley-Davidson Ultra Limited - Touring hạng sang với động cơ Milwaukee-Eight 114.",
        brand: "Harley-Davidson",
        category: "Touring",
        specs: {
            engine: "1.868 cc (V-Twin)",
            power: "94 mã lực",
            torque: "165 Nm",
            weight: "408 kg"
        },
        features: ["Boom! Box GTS", "Reflex Defensive Rider Systems", "Heated Hand Grips", "Cruise Control"],
        colors: ["Đen", "Xanh", "Đỏ"],
        stock: 3
    },
    {
        id: 15,
        name: "Kawasaki Concours 14",
        price: "599.000.000",
        images: {
            "Đen": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/23MY_Concours14_BK1_STU.png",
            "Xám": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/23MY_Concours14_GY1_STU.png",
            "Xanh": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/23MY_Concours14_BL1_STU.png"
        },
        description: "Kawasaki Concours 14 - Sport touring với hiệu suất cao.",
        brand: "Kawasaki",
        category: "Touring",
        specs: {
            engine: "1.352 cc (4 xy-lanh)",
            power: "155 mã lực",
            torque: "136 Nm",
            weight: "304 kg"
        },
        features: ["KTRC Traction Control", "ABS", "Tetra-Lever Shaft Drive", "KIPASS Security"],
        colors: ["Đen", "Xám", "Xanh"],
        stock: 4
    },
    // SPORTBIKE
    {
        id: 16,
        name: "Yamaha YZF-R1M",
        price: "999.000.000",
        images: {
            "Đen": "https://dd5394a0b8ca8e97ba29-abf76f3d91a2125517d6c7c409f095c7.ssl.cf1.rackcdn.com/content/common/Models/2024/d4d41173-1c4e-4ea4-8c73-4811c451e981.png",
            "Xanh": "https://dd5394a0b8ca8e97ba29-abf76f3d91a2125517d6c7c409f095c7.ssl.cf1.rackcdn.com/content/common/Models/2024/e5e51173-1c4e-4ea4-8c73-4811c451e982.png",
            "Trắng": "https://dd5394a0b8ca8e97ba29-abf76f3d91a2125517d6c7c409f095c7.ssl.cf1.rackcdn.com/content/common/Models/2024/f6f61173-1c4e-4ea4-8c73-4811c451e983.png"
        },
        description: "Yamaha YZF-R1M - Superbike đỉnh cao với công nghệ đua.",
        brand: "Yamaha",
        category: "Sportbike",
        specs: {
            engine: "998 cc (4 xy-lanh)",
            power: "200 mã lực",
            torque: "113.3 Nm",
            weight: "202 kg"
        },
        features: ["Electronic Racing Suspension", "Quick Shifter", "Launch Control", "Slide Control"],
        colors: ["Đen", "Xanh", "Trắng"],
        stock: 2
    },
    {
        id: 17,
        name: "Kawasaki Ninja ZX-10RR",
        price: "899.000.000",
        images: {
            "Đen": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/2024_Ninja_ZX-10RR_BK1.png",
            "Xanh": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/2024_Ninja_ZX-10RR_GN1.png",
            "Đỏ": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/2024_Ninja_ZX-10RR_RD1.png"
        },
        description: "Kawasaki Ninja ZX-10RR - Superbike với DNA đua thuần chất.",
        brand: "Kawasaki",
        category: "Sportbike",
        specs: {
            engine: "998 cc (4 xy-lanh)",
            power: "203 mã lực",
            torque: "114.9 Nm",
            weight: "207 kg"
        },
        features: ["Showa Balance Free Front Fork", "Öhlins Electronic Steering Damper", "Brembo Stylema", "IMU"],
        colors: ["Đen", "Xanh", "Đỏ"],
        stock: 3
    },
    {
        id: 18,
        name: "BMW M 1000 RR",
        price: "1.299.000.000",
        images: {
            "Đen": "https://bmw-motorrad.vn/wp-content/uploads/2023/12/M1000RR-Black-Storm-2.png",
            "Đỏ": "https://bmw-motorrad.vn/wp-content/uploads/2023/12/M1000RR-Red-1.png",
            "Trắng": "https://bmw-motorrad.vn/wp-content/uploads/2023/12/M1000RR-White-1.png"
        },
        description: "BMW M 1000 RR - Superbike đầu tiên mang thương hiệu M.",
        brand: "BMW",
        category: "Sportbike",
        specs: {
            engine: "999 cc (4 xy-lanh)",
            power: "212 mã lực",
            torque: "113 Nm",
            weight: "192 kg"
        },
        features: ["M Winglets", "Carbon Wheels", "M Competition Package", "ShiftCam Technology"],
        colors: ["Đen", "Đỏ", "Trắng"],
        stock: 2
    },
    {
        id: 19,
        name: "Aprilia RSV4 Factory",
        price: "899.000.000",
        images: {
            "Đen": "https://www.aprilia.com/content/dam/aprilia/models/my24/rsv4-factory/colors/rsv4-factory-black.png",
            "Xám": "https://www.aprilia.com/content/dam/aprilia/models/my24/rsv4-factory/colors/rsv4-factory-grey.png",
            "Đỏ": "https://www.aprilia.com/content/dam/aprilia/models/my24/rsv4-factory/colors/rsv4-factory-red.png"
        },
        description: "Aprilia RSV4 Factory - Superbike Italy với công nghệ MotoGP.",
        brand: "Aprilia",
        category: "Sportbike",
        specs: {
            engine: "1.099 cc (V4)",
            power: "217 mã lực",
            torque: "125 Nm",
            weight: "199 kg"
        },
        features: ["Öhlins Smart EC 2.0", "Brembo Stylema", "APRC System", "Aerodynamic Winglets"],
        colors: ["Đen", "Xám", "Đỏ"],
        stock: 2
    },
    {
        id: 20,
        name: "Honda CBR1000RR-R Fireblade SP",
        price: "999.000.000",
        images: {
            "Đỏ": "https://powersports.honda.com/-/media/products/family/cbr1000rr-r-fireblade-sp/2024/2024-cbr1000rr-r-fireblade-sp-grand-prix-red-650x380.png",
            "Đen": "https://powersports.honda.com/-/media/products/family/cbr1000rr-r-fireblade-sp/2024/2024-cbr1000rr-r-fireblade-sp-matte-black-metallic-650x380.png",
            "Trắng": "https://powersports.honda.com/-/media/products/family/cbr1000rr-r-fireblade-sp/2024/2024-cbr1000rr-r-fireblade-sp-pearl-white-650x380.png"
        },
        description: "Honda CBR1000RR-R Fireblade SP - Superbike với công nghệ MotoGP.",
        brand: "Honda",
        category: "Sportbike",
        specs: {
            engine: "999.9 cc (4 xy-lanh)",
            power: "215 mã lực",
            torque: "113 Nm",
            weight: "201 kg"
        },
        features: ["Öhlins NPX Fork", "Brembo Stylema", "Quick Shifter", "Launch Control"],
        colors: ["Đỏ", "Đen", "Trắng"],
        stock: 3
    },
    // ADVENTURE
    {
        id: 21,
        name: "KTM 1290 Super Adventure R",
        price: "699.000.000",
        images: {
            "Cam": "https://www.ktm.com/ktmgroup-storage/PHO_BIKE_90_RE/_png_/2024/1290-SUPER-ADVENTURE-R-Orange.png",
            "Đen": "https://www.ktm.com/ktmgroup-storage/PHO_BIKE_90_RE/_png_/2024/1290-SUPER-ADVENTURE-R-Black.png",
            "Trắng": "https://www.ktm.com/ktmgroup-storage/PHO_BIKE_90_RE/_png_/2024/1290-SUPER-ADVENTURE-R-White.png"
        },
        description: "KTM 1290 Super Adventure R - Adventure đỉnh cao với khả năng off-road.",
        brand: "KTM",
        category: "Adventure",
        specs: {
            engine: "1.301 cc (V-Twin)",
            power: "160 mã lực",
            torque: "138 Nm",
            weight: "221 kg"
        },
        features: ["WP XPLOR Suspension", "Cornering ABS", "Off-road Mode", "Rally Mode"],
        colors: ["Cam", "Đen", "Trắng"],
        stock: 3
    },
    {
        id: 22,
        name: "Ducati Multistrada V4 Rally",
        price: "899.000.000",
        images: {
            "Đỏ": "https://images.ctfassets.net/x7j9qwvpvr5s/7FgD8RGG2QYmCwsOCsEMC2/209b00292e24492bce4826034f5f0343/Model-Menu-MY23-MultistradaV4Rally-Red-v06.png",
            "Đen": "https://images.ctfassets.net/x7j9qwvpvr5s/2Qu8RjgKsABOEQZCjlCDh2/2d91cc99ae33dc0b8eb4e15c8b0c0157/Model-Menu-MY23-MultistradaV4Rally-Black-v06.png",
            "Xám": "https://images.ctfassets.net/x7j9qwvpvr5s/1ZulPz8AgGCXGGABKqyMM6/c5a7540d56c9eb27e4c8d12c34751c21/Model-Menu-MY23-MultistradaV4Rally-Grey-v06.png"
        },
        description: "Ducati Multistrada V4 Rally - Adventure touring đẳng cấp.",
        brand: "Ducati",
        category: "Adventure",
        specs: {
            engine: "1.158 cc (V4)",
            power: "170 mã lực",
            torque: "125 Nm",
            weight: "227 kg"
        },
        features: ["Skyhook Suspension", "Radar System", "Enduro Mode", "30L Fuel Tank"],
        colors: ["Đỏ", "Đen", "Xám"],
        stock: 2
    },
    {
        id: 23,
        name: "Triumph Tiger 1200 Rally Pro",
        price: "699.000.000",
        images: {
            "Xanh": "https://www.triumphmotorcycles.co.uk/images/bikes/adventure/tiger-1200/2024/colors/tiger-1200-rally-pro-blue.png",
            "Đen": "https://www.triumphmotorcycles.co.uk/images/bikes/adventure/tiger-1200/2024/colors/tiger-1200-rally-pro-black.png",
            "Trắng": "https://www.triumphmotorcycles.co.uk/images/bikes/adventure/tiger-1200/2024/colors/tiger-1200-rally-pro-white.png"
        },
        description: "Triumph Tiger 1200 Rally Pro - Adventure với khả năng off-road vượt trội.",
        brand: "Triumph",
        category: "Adventure",
        specs: {
            engine: "1.160 cc (3 xy-lanh)",
            power: "148 mã lực",
            torque: "130 Nm",
            weight: "249 kg"
        },
        features: ["Showa Semi-Active Suspension", "Blind Spot Radar", "Off-road Pro Mode", "Shift Assist"],
        colors: ["Xanh", "Đen", "Trắng"],
        stock: 3
    },
    {
        id: 24,
        name: "Honda Africa Twin Adventure Sports",
        price: "599.000.000",
        images: {
            "Đỏ": "https://powersports.honda.com/-/media/products/family/africa-twin-adventure-sports/2024/2024-africa-twin-adventure-sports-dct-grand-prix-red-650x380.png",
            "Đen": "https://powersports.honda.com/-/media/products/family/africa-twin-adventure-sports/2024/2024-africa-twin-adventure-sports-dct-matte-black-metallic-650x380.png",
            "Trắng": "https://powersports.honda.com/-/media/products/family/africa-twin-adventure-sports/2024/2024-africa-twin-adventure-sports-dct-pearl-glare-white-650x380.png"
        },
        description: "Honda Africa Twin Adventure Sports - Adventure đa năng với công nghệ tiên tiến.",
        brand: "Honda",
        category: "Adventure",
        specs: {
            engine: "1.084 cc (Parallel-Twin)",
            power: "101 mã lực",
            torque: "105 Nm",
            weight: "238 kg"
        },
        features: ["Showa EERA Suspension", "Apple CarPlay", "Android Auto", "Dual Clutch Transmission"],
        colors: ["Đỏ", "Đen", "Trắng"],
        stock: 4
    },
    {
        id: 25,
        name: "Yamaha Ténéré 700 World Raid",
        price: "459.000.000",
        images: {
            "Xanh": "https://dd5394a0b8ca8e97ba29-abf76f3d91a2125517d6c7c409f095c7.ssl.cf1.rackcdn.com/content/common/Models/2024/tenere-700-world-raid-blue.png",
            "Đen": "https://dd5394a0b8ca8e97ba29-abf76f3d91a2125517d6c7c409f095c7.ssl.cf1.rackcdn.com/content/common/Models/2024/tenere-700-world-raid-black.png",
            "Trắng": "https://dd5394a0b8ca8e97ba29-abf76f3d91a2125517d6c7c409f095c7.ssl.cf1.rackcdn.com/content/common/Models/2024/tenere-700-world-raid-white.png"
        },
        description: "Yamaha Ténéré 700 World Raid - Adventure thuần chất với khả năng off-road tuyệt vời.",
        brand: "Yamaha",
        category: "Adventure",
        specs: {
            engine: "689 cc (Parallel-Twin)",
            power: "72 mã lực",
            torque: "68 Nm",
            weight: "220 kg"
        },
        features: ["KYB Suspension", "23L Fuel Tank", "Rally Mode", "ABS"],
        colors: ["Xanh", "Đen", "Trắng"],
        stock: 5
    },
    // NAKED BIKE
    {
        id: 41,
        name: "Kawasaki Z H2",
        price: "699.000.000",
        images: {
            "Xanh": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/23MY_Z_H2_SE_GY1_STU__2_.png",
            "Đen": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/23MY_Z_H2_BK1_STU__2_.png",
            "Bạc": "https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/22MY_Z_H2_SE_GN1_STU__2_.png"
        },
        description: "Kawasaki Z H2 - Naked bike siêu nạp mạnh mẽ nhất phân khúc.",
        brand: "Kawasaki",
        category: "Naked",
        specs: {
            engine: "998 cc (4 xy-lanh, siêu nạp)",
            power: "197 mã lực",
            torque: "137 Nm",
            weight: "239 kg"
        },
        features: ["Supercharged Engine", "IMU", "TFT Display", "KTRC"],
        colors: ["Xanh", "Đen", "Bạc"],
        stock: 3
    },
    {
        id: 26,
        name: "Ducati Streetfighter V4 SP2",
        price: "959.000.000",
        images: {
            "Đen": "https://images.ctfassets.net/x7j9qwvpvr5s/7FgD8RGG2QYmCwsOCsEMC2/209b00292e24492bce4826034f5f0343/Model-Menu-MY23-StreetfighterV4SP2-Black-v06.png",
            "Đỏ": "https://images.ctfassets.net/x7j9qwvpvr5s/2Qu8RjgKsABOEQZCjlCDh2/2d91cc99ae33dc0b8eb4e15c8b0c0157/Model-Menu-MY23-StreetfighterV4SP2-Red-v06.png",
            "Xám": "https://images.ctfassets.net/x7j9qwvpvr5s/1ZulPz8AgGCXGGABKqyMM6/c5a7540d56c9eb27e4c8d12c34751c21/Model-Menu-MY23-StreetfighterV4SP2-Grey-v06.png"
        },
        description: "Ducati Streetfighter V4 SP2 - Naked bike hiệu năng cao với công nghệ đua.",
        brand: "Ducati",
        category: "Naked Bike",
        specs: {
            engine: "1.103 cc (V4)",
            power: "208 mã lực",
            torque: "123 Nm",
            weight: "197 kg"
        },
        features: ["Öhlins Smart EC 2.0", "Brembo Stylema R", "Carbon Wheels", "Biplane Wings"],
        colors: ["Đen", "Đỏ", "Xám"],
        stock: 2
    },
    {
        id: 27,
        name: "KTM 1290 Super Duke R Evo",
        price: "699.000.000",
        images: {
            "Cam": "https://www.ktm.com/ktmgroup-storage/PHO_BIKE_90_RE/_png_/2024/1290-SUPER-DUKE-R-EVO-Orange.png",
            "Đen": "https://www.ktm.com/ktmgroup-storage/PHO_BIKE_90_RE/_png_/2024/1290-SUPER-DUKE-R-EVO-Black.png",
            "Trắng": "https://www.ktm.com/ktmgroup-storage/PHO_BIKE_90_RE/_png_/2024/1290-SUPER-DUKE-R-EVO-White.png"
        },
        description: "KTM 1290 Super Duke R Evo - The Beast 3.0 với công nghệ Semi-Active.",
        brand: "KTM",
        category: "Naked Bike",
        specs: {
            engine: "1.301 cc (V-Twin)",
            power: "180 mã lực",
            torque: "140 Nm",
            weight: "200 kg"
        },
        features: ["WP Apex Pro Suspension", "Track Mode", "Launch Control", "Quickshifter+"],
        colors: ["Cam", "Đen", "Trắng"],
        stock: 3
    },
    {
        id: 28,
        name: "BMW M 1000 R",
        price: "849.000.000",
        images: {
            "Đen": "https://bmw-motorrad.vn/wp-content/uploads/2023/12/M1000R-Black-Storm-2.png",
            "Xanh": "https://bmw-motorrad.vn/wp-content/uploads/2023/12/M1000R-Blue-1.png",
            "Đỏ": "https://bmw-motorrad.vn/wp-content/uploads/2023/12/M1000R-Red-1.png"
        },
        description: "BMW M 1000 R - Naked bike mang DNA thương hiệu M.",
        brand: "BMW",
        category: "Naked Bike",
        specs: {
            engine: "999 cc (4 xy-lanh)",
            power: "210 mã lực",
            torque: "113 Nm",
            weight: "199 kg"
        },
        features: ["M Winglets", "Dynamic Damping Control", "M Brakes", "6.5-inch TFT"],
        colors: ["Đen", "Xanh", "Đỏ"],
        stock: 2
    },
    {
        id: 29,
        name: "Triumph Speed Triple 1200 RR",
        price: "699.000.000",
        images: {
            "Đỏ": "https://www.triumphmotorcycles.co.uk/images/bikes/roadsters/speed-triple-1200-rr/2024/colors/speed-triple-1200-rr-red.png",
            "Đen": "https://www.triumphmotorcycles.co.uk/images/bikes/roadsters/speed-triple-1200-rr/2024/colors/speed-triple-1200-rr-black.png",
            "Trắng": "https://www.triumphmotorcycles.co.uk/images/bikes/roadsters/speed-triple-1200-rr/2024/colors/speed-triple-1200-rr-white.png"
        },
        description: "Triumph Speed Triple 1200 RR - Café racer hiện đại với hiệu suất cao.",
        brand: "Triumph",
        category: "Naked Bike",
        specs: {
            engine: "1.160 cc (3 xy-lanh)",
            power: "178 mã lực",
            torque: "125 Nm",
            weight: "199 kg"
        },
        features: ["Öhlins Smart EC 2.0", "Brembo Stylema", "5-inch TFT", "Carbon Fiber"],
        colors: ["Đỏ", "Đen", "Trắng"],
        stock: 3
    },
    {
        id: 30,
        name: "Aprilia Tuono V4 Factory",
        price: "699.000.000",
        images: {
            "Đen": "https://www.aprilia.com/content/dam/aprilia/models/my24/tuono-v4-factory/colors/tuono-v4-factory-black.png",
            "Xám": "https://www.aprilia.com/content/dam/aprilia/models/my24/tuono-v4-factory/colors/tuono-v4-factory-grey.png",
            "Đỏ": "https://www.aprilia.com/content/dam/aprilia/models/my24/tuono-v4-factory/colors/tuono-v4-factory-red.png"
        },
        description: "Aprilia Tuono V4 Factory - Naked bike với DNA đua thuần chất.",
        brand: "Aprilia",
        category: "Naked Bike",
        specs: {
            engine: "1.077 cc (V4)",
            power: "175 mã lực",
            torque: "121 Nm",
            weight: "209 kg"
        },
        features: ["Öhlins Smart EC 2.0", "APRC System", "Cornering ABS", "Quickshifter"],
        colors: ["Đen", "Xám", "Đỏ"],
        stock: 2
    }
];

// Khởi tạo dữ liệu
function initializeData() {
    bikes = productsData;
    displayBikes(bikes);
}

// Hiển thị danh sách sản phẩm
function displayBikes(bikesToShow = bikes) {
    const container = document.getElementById('bikeContainer');
    if (!container) return;
    
    container.innerHTML = '';

    bikesToShow.forEach(bike => {
        const defaultImage = bike.images[bike.colors[0]];
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card bike-card h-100">
                <div class="position-relative">
                    <img src="${defaultImage}" class="card-img-top" alt="${bike.name}">
                    ${bike.stock < 5 ? `<span class="badge bg-danger position-absolute top-0 end-0 m-2">Còn ${bike.stock}</span>` : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${bike.name}</h5>
                    <p class="price">${bike.price} VND</p>
                    <p class="card-text flex-grow-1">${bike.description}</p>
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100 mb-2" onclick="showBikeDetails(${bike.id})">
                            <i class="fas fa-info-circle"></i> Chi tiết
                        </button>
                        <button class="btn btn-success w-100" onclick="addToCart(${bike.id})" ${bike.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i> ${bike.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Thay đổi hình ảnh khi chọn màu
function changeProductImage(bikeId, color) {
    const bike = bikes.find(b => b.id === bikeId);
    if (!bike || !bike.images[color]) return;

    currentColor = color;
    const modalImage = document.querySelector('#bikeModal .product-image');
    if (modalImage) {
        modalImage.src = bike.images[color];
        modalImage.alt = `${bike.name} - ${color}`;
    }

    // Cập nhật trạng thái active của các nút màu
    const colorButtons = document.querySelectorAll('#bikeModal .color-button');
    colorButtons.forEach(button => {
        if (button.getAttribute('data-color') === color) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Hiển thị chi tiết sản phẩm trong modal
function showBikeDetails(bikeId) {
    const bike = bikes.find(b => b.id === bikeId);
    if (!bike) return;

    currentBikeId = bikeId;
    currentColor = bike.colors[0];
    const modalElement = document.getElementById('bikeModal');
    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);
    document.getElementById('bikeModalLabel').textContent = bike.name;
    document.getElementById('bikeModalBody').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${bike.images[currentColor]}" class="img-fluid rounded product-image" alt="${bike.name}">
                <div class="mt-3">
                    <h6>Màu sắc có sẵn:</h6>
                    <div class="d-flex gap-2">
                        ${bike.colors.map(color => `
                            <button class="btn color-button ${color === currentColor ? 'active' : ''}" 
                                    onclick="changeProductImage(${bike.id}, '${color}')"
                                    data-color="${color}"
                                    style="min-width: 80px;">
                                ${color}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h4>Thông tin chi tiết</h4>
                <p><strong>Giá:</strong> ${bike.price} VND</p>
                <p><strong>Thương hiệu:</strong> ${bike.brand}</p>
                <p><strong>Phân loại:</strong> ${bike.category}</p>
                <p><strong>Tồn kho:</strong> ${bike.stock}</p>
                <p>${bike.description}</p>
                <h5 class="mt-4">Thông số kỹ thuật</h5>
                <ul class="list-unstyled">
                    ${Object.entries(bike.specs).map(([key, value]) => `
                        <li><strong>${key}:</strong> ${value}</li>
                    `).join('')}
                </ul>
                <h5 class="mt-4">Tính năng</h5>
                <ul class="list-unstyled">
                    ${bike.features.map(feature => `<li><i class="fas fa-check text-success"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    modal.show();
}

// Lọc xe mô tô theo tiêu chí
function filterBikes() {
    document.getElementById('loading').classList.remove('d-none');
    
    const brand = document.getElementById('brandSelect')?.value;
    const category = document.getElementById('categorySelect')?.value;
    const priceRange = document.getElementById('priceRange')?.value;

    setTimeout(() => {
        let filteredBikes = [...bikes];
        
        // Lọc theo hãng xe
        if (brand && brand !== 'Chọn hãng xe') {
            filteredBikes = filteredBikes.filter(bike => bike.brand.toLowerCase() === brand.toLowerCase());
        }

        // Lọc theo phân loại
        if (category && category !== 'Phân loại') {
            filteredBikes = filteredBikes.filter(bike => bike.category.toLowerCase() === category.toLowerCase());
        }

        // Lọc theo khoảng giá
        if (priceRange && priceRange !== 'Khoảng giá') {
            const getNumericPrice = (price) => {
                return parseInt(price.toString().replace(/[^\d]/g, ''));
            };

            switch(priceRange) {
                case 'Dưới 500 triệu':
                    filteredBikes = filteredBikes.filter(bike => 
                        getNumericPrice(bike.price) < 500000000
                    );
                    break;
                case '500 triệu - 1 tỷ':
                    filteredBikes = filteredBikes.filter(bike => {
                        const price = getNumericPrice(bike.price);
                        return price >= 500000000 && price <= 1000000000;
                    });
                    break;
                case '1 tỷ - 2 tỷ':
                    filteredBikes = filteredBikes.filter(bike => {
                        const price = getNumericPrice(bike.price);
                        return price > 1000000000 && price <= 2000000000;
                    });
                    break;
                case '2 tỷ - 3 tỷ':
                    filteredBikes = filteredBikes.filter(bike => {
                        const price = getNumericPrice(bike.price);
                        return price > 2000000000 && price <= 3000000000;
                    });
                    break;
                case 'Trên 3 tỷ':
                    filteredBikes = filteredBikes.filter(bike => 
                        getNumericPrice(bike.price) > 3000000000
                    );
                    break;
            }
        }

        // Hiển thị kết quả
        if (filteredBikes.length === 0) {
            document.getElementById('bikeContainer').innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> Không tìm thấy xe phù hợp với tiêu chí của bạn
                    </div>
                </div>
            `;
        } else {
            displayBikes(filteredBikes);
        }

        document.getElementById('loading').classList.add('d-none');
    }, 500);
}

// Thêm hàm phân loại xe theo danh mục
function getCategoryIcon(category) {
    switch(category.toLowerCase()) {
        case 'sportbike':
            return 'fa-motorcycle';
        case 'naked bike':
            return 'fa-biking';
        case 'adventure':
            return 'fa-mountain';
        case 'touring':
            return 'fa-road';
        case 'cruiser':
            return 'fa-route';
        default:
            return 'fa-motorcycle';
    }
}

// Thêm vào giỏ hàng
function addToCart(bikeId) {
    const bike = bikes.find(b => b.id === bikeId);
    if (!bike || bike.stock === 0) return;

    const existingItem = cart.find(item => item.id === bikeId);
    if (existingItem) {
        if (existingItem.quantity >= bike.stock) {
            showToast(`Chỉ còn ${bike.stock} xe ${bike.name} trong kho!`);
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id: bike.id,
            name: bike.name, 
            price: parseInt(bike.price.replace(/\./g, '')), 
            quantity: 1 
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${bike.name} đã được thêm vào giỏ hàng!`);
}

// Hiển thị thông báo
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast position-fixed bottom-0 end-0 m-3';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">Thông báo</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

// Hiển thị giỏ hàng
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPriceEl = document.getElementById('totalPrice');
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');

    if (cartItems || checkoutItems) {
        const itemsHtml = cart.map((item, index) => {
            const bike = bikes.find(b => b.id === item.id);
            const itemTotal = item.price * item.quantity;
            return `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${bike.image}" class="card-img-top" alt="${bike.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="price">${item.price.toLocaleString('vi-VN')} VND</p>
                            <p>Số lượng: 
                                <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                                ${item.quantity}
                                <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)" ${item.quantity >= bike.stock ? 'disabled' : ''}>+</button>
                            </p>
                            <p>Tổng: ${itemTotal.toLocaleString('vi-VN')} VND</p>
                            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                                <i class="fas fa-trash"></i> Xóa
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (cartItems) {
            cartItems.innerHTML = cart.length === 0 ? '<p class="text-center">Giỏ hàng trống.</p>' : itemsHtml;
        }
        if (checkoutItems) {
            checkoutItems.innerHTML = cart.length === 0 ? '<p class="text-center">Không có sản phẩm nào.</p>' : itemsHtml;
        }
    }

    if (totalPriceEl || checkoutTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const formattedTotal = total.toLocaleString('vi-VN');
        if (totalPriceEl) totalPriceEl.textContent = formattedTotal;
        if (checkoutTotal) checkoutTotal.textContent = formattedTotal;
    }
}

// Cập nhật số lượng
function updateQuantity(index, change) {
    const item = cart[index];
    const bike = bikes.find(b => b.id === item.id);
    
    if (change > 0 && item.quantity >= bike.stock) {
        showToast(`Chỉ còn ${bike.stock} xe ${bike.name} trong kho!`);
        return;
    }

    item.quantity += change;
    if (item.quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Xóa từng sản phẩm
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Xóa toàn bộ giỏ hàng
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Khởi tạo trang web
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    displayCart();
});