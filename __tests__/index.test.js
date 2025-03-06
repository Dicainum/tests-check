import { DiscountService } from './DiscountService.js';

const percentageDiscount = { apply: (price) => price * 0.8 }; // 20% скидка
const newfixedStrategy = { apply: (price) => price - 50 };

test('test2', () => { //Проверка выбрасывания ошибки, если стратегия не установлена
  const service = new DiscountService();
  expect(() => service.getFinalPrice(100)).toThrow('стратегия не установлена');
});

test('test1', () => { //Проверка корректного использования стратегии скидок
  const service = new DiscountService();
  service.setDiscountStrategy(percentageDiscount);
  expect(service.getFinalPrice(200)).toBe(160);
});

test('test3', () => { //Проверка сохранения истории скидок
  const service = new DiscountService();
  service.setDiscountStrategy(identityStrategy);
  
  service.getFinalPrice(100);
  service.getFinalPrice(200);
  
  expect(service.getDiscountHistory().length).toBe(2);
  expect(service.getDiscountHistory()[1].originalPrice).toBe(200);
});

test('test4', () => { //Проверка очистки истории
  const service = new DiscountService();
  service.setDiscountStrategy(percentageDiscount);
  
  service.getFinalPrice(100);
  service.clearHistory();
  
  expect(service.getDiscountHistory()).toEqual([]);
});

test('test5', () => { //Проверка работы с разными стратегиями
  const service = new DiscountService();
  
  service.setDiscountStrategy(percentageDiscount);
  const result1 = service.getFinalPrice(100);
  
  service.setDiscountStrategy(newfixedStrategy);
  const result2 = service.getFinalPrice(100);
  
  expect(result1).toBe(80);
  expect(result2).toBe(50);
});
