import {
  StreamBidsResponse,
  Bid as GrpcIndexerBid,
  Auction as GrpcAuction,
} from '@injectivelabs/indexer-api/injective_auction_rpc_pb'
import { Coin } from '@injectivelabs/ts-types'

export interface IndexerBid {
  bidder: string
  bidAmount: string
  bidTimestamp: number
}

export interface Auction {
  winner: string
  basketList: Coin[]
  winningBidAmount: string
  round: number
  endTimestamp: number
  updatedAt: number
}

export { GrpcAuction, GrpcIndexerBid, StreamBidsResponse }
