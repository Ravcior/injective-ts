import {
  TokenMeta as GrpcTokenMeta,
  PriceLevel as GrpcPriceLevel,
} from '@injectivelabs/indexer-api/injective_spot_exchange_rpc_pb'

export interface PriceLevel {
  price: string
  quantity: string
  timestamp: number
}

export interface Orderbook {
  buys: PriceLevel[]
  sells: PriceLevel[]
}

export interface OrderbookWithSequence {
  sequence: number
  buys: PriceLevel[]
  sells: PriceLevel[]
}

export interface OrderbookWithSequence {
  buys: PriceLevel[]
  sells: PriceLevel[]
  sequence: number
}

export enum IndexerOracleType {
  UNSPECIFIED = 0,
  BAND = 1,
  PRICEFEED = 2,
  COINBASE = 3,
  CHAINLINK = 4,
  RAZOR = 5,
  DIA = 6,
  API3 = 7,
  UMA = 8,
  PYTH = 9,
  BANDIBC = 10,
  PROVIDER = 11,
}

export interface IndexerTokenMeta extends GrpcTokenMeta.AsObject {
  coinGeckoId: string
}

export { GrpcTokenMeta, GrpcPriceLevel }
