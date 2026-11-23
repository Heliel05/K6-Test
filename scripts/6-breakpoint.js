import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 1000 },
  ],
};

export default function () {
  http.get('http://localhost:3000/soma?a=10&b=20');
  sleep(1);
}