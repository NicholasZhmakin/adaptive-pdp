
export const sizesMockData = [
    {id: 1, width: 1200, height: 1500},
    {id: 2, width: 320, height: 50},
    {id: 3, width: 480, height: 320},
    {id: 4, width: 728, height: 90},
    {id: 5, width: 320, height: 100},
    {id: 6, width: 1080, height: 1080},
    {id: 7, width: 1080, height: 1920},
    {id: 8, width: 600, height: 500},
    {id: 9, width: 375, height: 667},
    {id: 10, width: 1500, height: 1120},
    {id: 11, width: 168, height: 28},
    {id: 12, width: 1200, height: 800},
    {id: 13, width: 1456, height: 180},
    {id: 14, width: 1536, height: 2048},
    {id: 15, width: 1000, height: 1500},
]



const mockItem1 = {
    id: 1,
    type: 'button',

    text: 'enter some',

    font: {
        id: 1,
        url: 'fontUrl',
    },

    image: {
        id: 1,
        url: 'https://picsum.photos/200/250'
    },

    styles: {
        width: "250px",
        height: "50px",

        left: "10px",
        top: "200px",

        transform: {
            rotate: "0deg",
        },

        'z-index': 3,

        color: 'yellow',
        'font-size': '20px',
        'font-weight': '900',
        'font-family': 'ZonaPro-BlackItalic',
        'text-align': 'center',
        // 'background': 'orange',
        // 'background': 'radial-gradient(circle, rgba(34,193,195,1) 48%, rgba(36,131,68,1) 67%, rgba(198,189,83,1) 87%, rgba(253,187,45,1) 100%)',
        // 'background': 'linear-gradient(180deg, rgb(34, 193, 195) 48%, rgb(36, 131, 68) 67%, rgb(198, 189, 83) 87%, rgb(253, 187, 45) 100%)',
        'background': 'linear-gradient(45deg, rgb(226, 54, 54) 51%, rgb(7, 49, 213) 55%)',
        'border-color': 'red',
        'border-width': '3px',
        'border-style': 'solid',
        'border-radius': '30px',
        'border-opacity': 0.7,
    }
};


const mockItem2 = {
    id: 2,
    type: 'image',

    text: 'enter some',

    font: {
        id: 2,
        url: 'fontUrl',
    },

    image: {
        id: 2,
        url: 'https://picsum.photos/200/200'
    },

    styles: {
        width: "200px",
        height: "200px",

        left: "300px",
        top: "150px",

        transform: "rotate(21.2deg)",

        'z-index': 2,
    }
};


const mockItem3 = {
    id: 3,
    type: 'text',

    text: 'enter some',

    font: {
        id: 3,
        url: 'fontUrl',
    },

    image: {
        id: 3,
        url: 'https://picsum.photos/200/250'
    },

    styles: {
        width: "150px",
        height: "100px",

        left: "600px",
        top: "200px",

        transform: {
            rotate: "0deg",
        },

        'z-index': 1,

        color: 'black',
        'font-size': '30px',
        'font-family': '"Roboto", sans-serif',
        'text-align': 'center',
    }
};


export const arrayDnd = [{...mockItem1}, {...mockItem2}, {...mockItem3}];