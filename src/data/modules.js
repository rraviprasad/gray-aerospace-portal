import {
  Building2,
  Package,
  ShoppingCart,
  Boxes,
  SlidersHorizontal,
  ReceiptText,
  Ship,
  BarChart3,
  FileStack,
  Wallet,
} from 'lucide-react'

export const modules = [
  { id: 'bp-code', code: '01', name: 'BP Code', sub: 'New Supplier / Customer', icon: Building2, ready: true },
  { id: 'item-code', code: '02', name: 'Item Code', sub: 'New Item', icon: Package, ready: false },
  { id: 'purchase-order', code: '03', name: 'Purchase Order', sub: 'New PO', icon: ShoppingCart, ready: false },
  { id: 'inventory', code: '04', name: 'Inventory', sub: 'Stock Levels', icon: Boxes, ready: false },
  { id: 'oms', code: '05', name: 'OMS', sub: 'Offer Matrix Session', icon: SlidersHorizontal, ready: false },
  { id: 'sales-order', code: '06', name: 'Sales Order', sub: 'New SO', icon: ReceiptText, ready: false },
  { id: 'ship-doc-hub', code: '07', name: 'Ship Doc Hub', sub: 'Invoice & Packing List', icon: Ship, ready: false },
  { id: 'analyser', code: '08', name: 'Analyser', sub: 'Reports & Insights', icon: BarChart3, ready: false },
  { id: 'asn', code: '09', name: 'ASN', sub: 'Advance Shipment Notice', icon: FileStack, ready: false },
  { id: 'payment', code: '10', name: 'Payment', sub: 'Debit / Credit', icon: Wallet, ready: false },
]
