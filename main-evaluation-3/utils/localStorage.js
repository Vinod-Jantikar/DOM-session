const STORAGE_KEY = "evalData";

export const getRestaurants = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveRestaurants = restaurants => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
};
