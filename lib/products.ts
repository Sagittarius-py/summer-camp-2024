
import dataJson from '../products.json';
import fs from 'fs';
import path from 'path';

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  isAlcohol: boolean;
};


export function fetchProducts(page: any): Array<Product> {
    if(page === 0){
      page = 1;
    }
    const pageNumber = page || 1;
    const itemsPerPage = 10;
  
    const filePath = path.join(process.cwd(), 'products.csv');

      const dataCSV = readCSV(filePath);
      var combinedData = [...dataJson, ...dataCSV];
      combinedData = sortById(combinedData)

      combinedData = filterAlkohol(combinedData);

      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const products = combinedData.slice(startIndex, endIndex);
  
      return products;
    
  }

  const readCSV = (filePath: string): Product[] => {
    const csvContent = fs.readFileSync(filePath, 'utf8');
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
  
    const jsonArray: Product[] = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());

      const product: Product = {
        id: values[0],
        name: values[1],
        price: parseFloat(values[2]),
        currency: values[3],
        quantity: parseInt(values[4], 10),
        isAlcohol: values[5] === '1' 
      };

      return product;
    });
    return jsonArray;
  };

  function sortById(arr: Array<Product>) {
    return arr.sort((a, b) => a.id.localeCompare(b.id));
  }
  

  function filterAlkohol(arr: Array<Product>){
    let filteredData: Array<Product> = [];

    arr.map(product => {
      if(!product.isAlcohol){
        filteredData.push(product)
      }  
    })

    return filteredData;
  }