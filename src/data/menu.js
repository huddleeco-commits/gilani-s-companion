// Shared menu data - synced across Menu and Order screens
export const MENU_DATA = {
  categories: [
    {
      name: 'Signature Steaks',
      items: [
        { id: 1, name: 'Filet Mignon', description: '8oz center-cut, butter-basted', price: 52, popular: true },
        { id: 2, name: 'Ribeye', description: '14oz bone-in, dry-aged 28 days', price: 58, popular: true },
        { id: 3, name: 'NY Strip', description: '12oz prime cut, herb-crusted', price: 48 },
        { id: 4, name: 'Porterhouse', description: '24oz for two, tableside carved', price: 95 },
      ]
    },
    {
      name: 'Starters',
      items: [
        { id: 5, name: 'Shrimp Cocktail', description: 'Jumbo gulf shrimp, house cocktail sauce', price: 18 },
        { id: 6, name: 'Wagyu Carpaccio', description: 'Truffle aioli, capers, arugula', price: 24, popular: true },
        { id: 7, name: 'French Onion Soup', description: 'Gruyère crouton, caramelized onions', price: 14 },
      ]
    },
    {
      name: 'Sides',
      items: [
        { id: 8, name: 'Truffle Mac & Cheese', description: 'Black truffle, aged cheddar', price: 16 },
        { id: 9, name: 'Creamed Spinach', description: 'House recipe, nutmeg cream', price: 12 },
        { id: 10, name: 'Loaded Baked Potato', description: 'Bacon, chives, sour cream', price: 14 },
      ]
    },
    {
      name: 'Desserts',
      items: [
        { id: 11, name: 'Chocolate Lava Cake', description: 'Warm chocolate center, vanilla ice cream', price: 14 },
        { id: 12, name: 'New York Cheesecake', description: 'Classic style, berry compote', price: 12 },
        { id: 13, name: 'Crème Brûlée', description: 'Madagascar vanilla, caramelized sugar', price: 11 },
      ]
    }
  ]
};

export const BUSINESS_NAME = "Gilani's";
