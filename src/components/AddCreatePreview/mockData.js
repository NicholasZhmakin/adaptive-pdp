


const mockItem1 = {
    id: 1,
    type: 'button',

    text: 'enter some',

    font: {
        id: 12,
        url: 'fontUrl',
    },

    image: {
        id: 21,
        url: 'https://picsum.photos/200/250'
    },

    styles: {
        width: "250px",
        height: "200px",

        left: "0px",
        top: "0px",

        transform: {
            rotate: "0deg",
            scaleX: 1,
            scaleY: 1,
            matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        },

        color: 'yellow',
        'font-size': '20px',
        'font-family': '"Roboto", sans-serif',
        'text-align': 'center',

        'background-color': 'blue',
        'border-color': 'red',
        'border-width': '3px',
        'border-radius': '30px',
    }
};


const mockItem2 = {
    id: 2,
    type: 'image',

    text: 'enter some',

    font: {
        id: 12,
        url: 'fontUrl',
    },

    image: {
        id: 21,
        url: 'https://picsum.photos/200/250'
    },

    styles: {
        width: "250px",
        height: "200px",

        left: "0px",
        top: "0px",

        transform: {
            rotate: "0deg",
            scaleX: 1,
            scaleY: 1,
            matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        },
    }
};


const mockItem3 = {
    id: 3,
    type: 'text',

    text: 'enter some',

    font: {
        id: 12,
        url: 'fontUrl',
    },

    image: {
        id: 21,
        url: 'https://picsum.photos/200/250'
    },

    styles: {
        width: "250px",
        height: "200px",

        left: "0px",
        top: "0px",

        transform: {
            rotate: "0deg",
            scaleX: 1,
            scaleY: 1,
            matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        },

        color: 'black',
        'font-size': '20px',
        'font-family': '"Roboto", sans-serif',
        'text-align': 'center',
    }
};


export const arrayDnd = [{...mockItem1}, {...mockItem2}, {...mockItem3}];