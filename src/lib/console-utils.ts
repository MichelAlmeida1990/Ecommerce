// Função para criar console logs estilizados
export const logProductAdded = (productName: string, price: number) => {
  const styles = [
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'color: white',
    'padding: 12px 20px',
    'border-radius: 8px',
    'font-weight: bold',
    'font-size: 14px',
    'box-shadow: 0 4px 15px rgba(0,0,0,0.2)',
    'border: 2px solid #4f46e5'
  ].join(';');

  const productStyles = [
    'background: linear-gradient(135deg, #10b981 0%, #059669 100%)',
    'color: white',
    'padding: 8px 16px',
    'border-radius: 6px',
    'font-weight: 600',
    'font-size: 13px',
    'margin: 4px 0'
  ].join(';');

  const priceStyles = [
    'background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    'color: white',
    'padding: 6px 12px',
    'border-radius: 4px',
    'font-weight: bold',
    'font-size: 12px'
  ].join(';');

  console.log(
    `%c🛒 PRODUTO ADICIONADO AO CARRINHO! 🛒\n\n%c📦 ${productName}\n\n%c💰 R$ ${price.toFixed(2).replace('.', ',')}`,
    styles,
    productStyles,
    priceStyles
  );
};

export const logCartUpdate = (action: string, itemCount: number, total: number) => {
  const styles = [
    'background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    'color: white',
    'padding: 10px 16px',
    'border-radius: 6px',
    'font-weight: bold',
    'font-size: 13px'
  ].join(';');

  console.log(
    `%c🔄 CARRINHO ATUALIZADO: ${action.toUpperCase()}\n📊 Itens: ${itemCount} | Total: R$ ${total.toFixed(2).replace('.', ',')}`,
    styles
  );
};

export const logSuccess = (message: string, icon: string = '✅') => {
  const styles = [
    'background: linear-gradient(135deg, #10b981 0%, #059669 100%)',
    'color: white',
    'padding: 10px 16px',
    'border-radius: 6px',
    'font-weight: bold',
    'font-size: 13px'
  ].join(';');

  console.log(`%c${icon} ${message}`, styles);
};

export const logError = (message: string, icon: string = '❌') => {
  const styles = [
    'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    'color: white',
    'padding: 10px 16px',
    'border-radius: 6px',
    'font-weight: bold',
    'font-size: 13px'
  ].join(';');

  console.log(`%c${icon} ${message}`, styles);
};
