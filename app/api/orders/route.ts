import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch orders'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Validate required fields
    if (!body.customerName || !body.address || !body.items) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: customerName, address, items'
      }, { status: 400 });
    }
    
    const order = await Order.create(body);
    
    return NextResponse.json({
      success: true,
      data: order
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create order'
    }, { status: 500 });
  }
  //API TO CREATE AND FETCH ORDERS
  export async function POST(request: Request) {
  try {
    const { customerName, address, items } = await request.json();
    await connectMongoDB();
    await Order.create({ customerName, address, items });
    return NextResponse.json({ message: "Order Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json({ orders });
}
}
