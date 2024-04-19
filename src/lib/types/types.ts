export interface Receipt {
	id: number;
	totalPaid: number;
	coupon: string | null;
	date_purchased: Date | string;
	cart_items: CartItem[];
	receipt_discounts: ReceiptDiscount[];
	receipt_payments: ReceiptPayment[];
	coupons: Coupon | null;
}
export interface ReceiptPayment {
	receipt_id: number;
	payment_method_id: number;
	amount_paid: number | null;
	receipts: Receipt;
	payment_methods: PaymentMethod;
}
export interface PaymentMethod {
	id: number;
	name: string;
	receipt_payments: ReceiptPayment[];
}
export interface Product {
	id: number;
	name: string | null;
	shortname: string | null;
	stock: number;
	min_stock: number | null;
	image: string | null;
	product_type_id: number;
	barcode: string | null;
	disabled: boolean;
	cart_items: CartItem[];
	product_types: ProductType;
}
export interface ProductType {
	id: number;
	name: string | null;
	price: number;
	product_type_coupons: ProductTypeCoupon[];
	products?: Product[];
}
export interface ProductTypeCoupon {
	product_type_id: number;
	coupon_token: string;
	product_types: ProductType;
	coupons: Coupon;
}
export interface ProductWithQuantity extends Product {
	product_id: string | number | null | undefined;
	quantity: number;
}
export interface CartItem {
	receipt_id: number;
	product_id: number;
	quantity: number;
	product_price?: number;
	receipts: Receipt;
	products: Product;
}
export interface Coupon {
	token: string;
	date_created: Date;
	expire_date: Date;
	max_uses: number;
	times_used: number;
	discount_id: number;
	discounts?: Discount;
	receipts?: Receipt[];
	disabled: boolean;
}
export interface Discount {
	id: number;
	name?: string;
	amount: number;
	discount_type_id: number;
	coupons?: Coupon[];
	discount_type?: DiscountType;
	receipt_discounts?: ReceiptDiscount[];
}
export interface DiscountType {
	id: number;
	name: string | null;
	symbol: string | null;
	discounts: Discount[];
}
export interface ReceiptDiscount {
	receipt_id: number;
	discount_id: number;
	receipts: Receipt;
	discounts: Discount;
}
