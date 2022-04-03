

var obj1 = [
          {
       
            
                "name": "Living Room Furniture",
                "imgUrl": "https://i.postimg.cc/FsmdBTF0/10122021-FURNI-Pop-Cat-1.jpg"
            },
            {
                "name": "Dining Room & Bar Furniture",
                "imgUrl": "https://i.postimg.cc/FHwh2Kbw/10122021-FURNI-Pop-Cat-2.jpg"
            },
            {
                "name": "Bedroom Furniture",
                "imgUrl": "https://i.postimg.cc/h4McKsbL/10122021-FURNI-Pop-Cat-3.jpg"
            },
            {
                "name": "Patio Furniture",
                "imgUrl": "https://i.postimg.cc/MpVLpK2C/10122021-FURNI-Pop-Cat-4.jpg"
            },
            {
                "name": "Home Office Furniture",
                "imgUrl": "https://i.postimg.cc/RFDdTjx1/10122021-FURNI-Pop-Cat-8.jpg"
            },
            {
                "name": "Small Space Furniture",
                "imgUrl": "https://i.postimg.cc/3xxZP8rj/10122021-FURNI-Pop-Cat-6.jpg"
            },
            {
                "name": "Kitchen Furniture",
                "imgUrl": "https://i.postimg.cc/X77Fv2M4/10122021-FURNI-Pop-Cat-7.jpg"
            },
            {
                "name": "Entryway Furniture",
                "imgUrl": "https://i.postimg.cc/ZRwbsxwx/10122021-FURNI-Pop-Cat-5.jpg"
            },
            {
                "name": "Bathroom Furniture",
                "imgUrl": "https://i.postimg.cc/7L6JHhj9/10122021-FURNI-Pop-Cat-9.jpg"
            },
            {
                "name": "Mattresses",
                "imgUrl": "https://i.postimg.cc/VsTR3Qr2/09062021-FALL2021-Furni-Pop-Cat-10.jpg"
            },
            {
                "name": "Recreation Room",
                "imgUrl": "https://i.postimg.cc/tJ0znFjp/09062021-FALL2021-Furni-Pop-Cat-11.jpg"
            },
            {
                "name": "Kids & Toddler Furniture",
                "imgUrl": "https://i.postimg.cc/TwbVxhWS/09062021-FALL2021-Furni-Pop-Cat-12.jpg"
            }
        ]

        localStorage.setItem("furniture_data",JSON.stringify(obj1))


      var  moreCategory= [
            {
                "name": "Sofas & Couches",
                "imgUrl": "https://i.postimg.cc/W19CFYfV/03232020-furniture-other-Popular1.jpg"
            },
            {
                "name": "Sectional Sofas",
                "imgUrl": "https://i.postimg.cc/8khYBznt/03232020-furniture-other-Popular2.jpg"
            },
            {
                "name": "Living Room Sets",
                "imgUrl": "https://i.postimg.cc/SxX7dZxk/03232020-furniture-other-Popular3.jpg"
            },
            {
                "name": "Accent Tables",
                "imgUrl": "https://i.postimg.cc/bw2kksmv/03232020-furniture-other-Popular4.jpg"
            },
            {
                "name": "Loveseats",
                "imgUrl": "https://i.postimg.cc/43kt5s0Q/03232020-furniture-other-Popular5.jpg"
            },
            {
                "name": "Accent Chairs",
                "imgUrl": "https://i.postimg.cc/ZY7dQrgR/03232020-furniture-other-Popular6.jpg"
            },
            {
                "name": "Dining Sets",
                "imgUrl": "https://i.postimg.cc/pr4yLBbJ/12242020-gnp-furniture-219x219-shop-more-diningrm.jpg"
            },
            {
                "name": "Dining Tables",
                "imgUrl": "https://i.postimg.cc/gJB2gKJb/03232020-furniture-other-Popular8.jpg"
            },
            {
                "name": "Dining Chairs",
                "imgUrl": "https://i.postimg.cc/SxqY2DYg/03232020-furniture-other-Popular9.jpg"
            },
            {
                "name": "Buffets",
                "imgUrl": "https://i.postimg.cc/bwNNfMtf/03232020-furniture-other-Popular10.jpg"
            },
            {
                "name": "Bar Stools",
                "imgUrl": "https://i.postimg.cc/7Z6DW2Fx/03232020-furniture-other-Popular11.jpg"
            },
            {
                "name": "Shop All Furniture on Sale",
                "imgUrl": "https://i.postimg.cc/J4TCZhGS/Artboard.png"
            }
        ]

        localStorage.setItem("moreCategory",JSON.stringify(moreCategory))

var obj3 = [
    {
        "name": "Sofas & Couches" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/is/images/direct/da8e341a52b0b4168f5531527177130eec875ca8/Carson-Carrington-Odhult-Tufted-Contemporary-Tuxedo-Sofa.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "Living Room Sets" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/22341232/Candace-Mid-Century-Modern-Fabric-Arm-Chair-and-Loveseat-Set-by-Christopher-Knight-Home-087d71b4-c7d8-4352-b7f5-ac19c5a60ce2_1000.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "Sectional Sofas" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/24151999/Welles-Mid-Century-2-Piece-Chaise-Sectional-Sofa-Set-With-Tufted-by-Christopher-Knight-Home-62f39e28-0a20-4594-8815-be5fb283c2b1_1000.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "TV Stands & Entertainment Centers" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/is/images/direct/cc3e23e59b0b7275ff6cb732d7c2d7f6f18df9e9/The-Grey-Barn-70%22-Rustic-Fireplace-TV-Stand-Console.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "Console, Coffee & End Tables" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/is/images/direct/2c822047c6482dd072478dac0a517f7fd4ba74f2/Berwick-Metal-and-Wood-Nesting-Basket-Tables.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "Recliners Chairs & Rocking Recliners" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/is/images/direct/f7e4607f8a2129ab4b1ab22cd1769a61b681c3db/Abbyson-Holloway-Mid-century-Top-Grain-Leather-Pushback-Recliner.jpg?imWidth=320&impolicy=medium",
    },
   
]
localStorage.setItem("category",JSON.stringify(obj3))
var obj4 = [
{
        "name": "Living Room Chairs" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/is/images/direct/dfd768dd6f5ec2fc877af8695096a5ff4e9942e4/Copper-Grove-Dhi-Upholstered-Armchair.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "ottomans & Storage Ottomans" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/14741699/Christopher-Knight-Home-Yuny-Round-Fabric-Ottoman-Pouf-43157217-9e91-49f5-9440-a293f5a47a18_1000.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "Loveseats" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/is/images/direct/a32ab49e9155e1abe7a5903331149853a3e02c18/Carson-Carrington-Hedeby-Upholstered-Fabric-Loveseat.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "Bookshelves & Bookcases" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/is/images/direct/0485073b17812f0a60e7686583f28e805f0aeac8/Ramses-Modern-Grey-Bookcase-Display-Cabinet.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "Futons" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/is/images/direct/b6158f17126c52bc350f84c94db20fa716543fce/Abbyson-Carson-Mid-century-Tufted-Convertible-Futon-Sleeper-Sofa.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "Benches & Settees" ,
        "imgUrl": "https://ak1.ostkcdn.com/images/products/is/images/direct/bf33b0970649fedab76cbe0913b1911ddc4ea7f6/Morgan-Creek-Antique-White-Storage-Hall-Bench.jpg?imWidth=320&impolicy=medium",
    },
]
localStorage.setItem("trending",JSON.stringify(obj4))

var obj5 = [
    {
        "name": "Modern & Contemporary Living Room Furniture ",
        "imgUrl": "https://ak1.ostkcdn.com/img/mxc/10222019_LRFurni_z_ThirdBMOD1_ModernandContemporaryLivingRoomFurniture.jpg?imWidth=320&impolicy=medium ",
    },
    {
        "name": "Rustic Living Room Furniture ",
        "imgUrl": " https://ak1.ostkcdn.com/img/mxc/10222019_LRFurni_z_ThirdBMOD2_RusticLivingRoomFurniture.jpg?imWidth=320&impolicy=medium",
    },
    {
        "name": "Farmhouse Living Room Furniture ",
        "imgUrl": "https://ak1.ostkcdn.com/img/mxc/10222019_LRFurni_z_ThirdBMOD3_FarmhouseLivingRoomFurniture.jpg?imWidth=320&impolicy=medium ",
    },
    {
        "name": "Traditional Living Room Furniture ",
        "imgUrl": "https://ak1.ostkcdn.com/img/mxc/10222019_LRFurni_z_ThirdBMOD4_TraditionalLivingRoomFurniture.jpg?imWidth=320&impolicy=medium ",
    },
    {
        "name": "Mid-Century Modern Living Room Furniture ",
        "imgUrl": "https://ak1.ostkcdn.com/img/mxc/10222019_LRFurni_z_ThirdBMOD5_MidCenturyModernLivingRoomFurniture.jpg?imWidth=320&impolicy=medium ",
    },
    {
        "name": "Nautical & Coastal Living Room Furniture",
        "imgUrl": "https://ak1.ostkcdn.com/img/mxc/10222019_LRFurni_z_ThirdBMOD6_NauticalandCoastalLivingRoomFurniture.jpg?imWidth=320&impolicy=medium ",
    },
]

localStorage.setItem("ourstyle",JSON.stringify(obj5))
