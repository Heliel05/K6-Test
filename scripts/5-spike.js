import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },  
    { duration: '10s', target: 400 }, 
    { duration: '20s', target: 400 }, 
    { duration: '10s', target: 10 },  
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  http.get('http://localhost:3000/soma?a=10&b=20');
  sleep(1);
}