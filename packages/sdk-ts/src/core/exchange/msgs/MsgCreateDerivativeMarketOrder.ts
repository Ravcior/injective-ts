import { MsgCreateDerivativeMarketOrder as BaseMsgCreateDerivativeMarketOrder } from '@injectivelabs/chain-api/injective/exchange/v1beta1/tx_pb'
import {
  DerivativeOrder,
  OrderInfo,
  OrderTypeMap,
} from '@injectivelabs/chain-api/injective/exchange/v1beta1/exchange_pb'
import { MsgBase } from '../../MsgBase'
import { amountToCosmosSdkDecAmount } from '../../../utils/numbers'

export declare namespace MsgCreateDerivativeMarketOrder {
  export interface Params {
    marketId: string
    subaccountId: string
    injectiveAddress: string
    orderType: OrderTypeMap[keyof OrderTypeMap]
    triggerPrice?: string
    feeRecipient: string
    price: string
    margin: string
    quantity: string
  }

  export interface Amino {
    type: '/injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder'
    message: BaseMsgCreateDerivativeMarketOrder
  }

  export interface Data extends BaseMsgCreateDerivativeMarketOrder.AsObject {
    '@type': '/injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder'
  }

  export interface Web3 extends BaseMsgCreateDerivativeMarketOrder.AsObject {
    '@type': '/injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder'
  }

  export type Proto = BaseMsgCreateDerivativeMarketOrder
}

const createMarketOrder = (params: MsgCreateDerivativeMarketOrder.Params) => {
  const orderInfo = new OrderInfo()
  orderInfo.setSubaccountId(params.subaccountId)
  orderInfo.setFeeRecipient(params.feeRecipient)
  orderInfo.setPrice(params.price)
  orderInfo.setQuantity(params.quantity)

  const derivativeOrder = new DerivativeOrder()
  derivativeOrder.setMarketId(params.marketId)
  derivativeOrder.setOrderType(params.orderType)
  derivativeOrder.setOrderInfo(orderInfo)
  derivativeOrder.setMargin(params.margin)

  if (params.triggerPrice) {
    derivativeOrder.setTriggerPrice(params.triggerPrice)
  }

  const message = new BaseMsgCreateDerivativeMarketOrder()
  message.setSender(params.injectiveAddress)
  message.setOrder(derivativeOrder)

  return message
}

export default class MsgCreateDerivativeMarketOrder extends MsgBase<
  MsgCreateDerivativeMarketOrder.Params,
  MsgCreateDerivativeMarketOrder.Data,
  MsgCreateDerivativeMarketOrder.Proto,
  MsgCreateDerivativeMarketOrder.Web3,
  MsgCreateDerivativeMarketOrder.Amino
> {
  static fromJSON(
    params: MsgCreateDerivativeMarketOrder.Params,
  ): MsgCreateDerivativeMarketOrder {
    return new MsgCreateDerivativeMarketOrder(params)
  }

  toProto(): MsgCreateDerivativeMarketOrder.Proto {
    const { params: initialParams } = this
    const params = {
      ...initialParams,
      price: amountToCosmosSdkDecAmount(initialParams.price).toFixed(),
      margin: amountToCosmosSdkDecAmount(initialParams.margin).toFixed(),
      triggerPrice: amountToCosmosSdkDecAmount(
        initialParams.triggerPrice || 0,
      ).toFixed(),
      quantity: amountToCosmosSdkDecAmount(initialParams.quantity).toFixed(),
    } as MsgCreateDerivativeMarketOrder.Params

    return createMarketOrder(params)
  }

  toData(): MsgCreateDerivativeMarketOrder.Data {
    const proto = this.toProto()

    return {
      '@type': '/injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder',
      ...proto.toObject(),
    }
  }

  toWeb3(): MsgCreateDerivativeMarketOrder.Web3 {
    const { params } = this
    const proto = createMarketOrder(params)

    return {
      '@type': '/injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder',
      ...proto.toObject(),
    }
  }

  toAmino(): MsgCreateDerivativeMarketOrder.Amino {
    const proto = this.toProto()

    return {
      type: '/injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder',
      message: proto,
    }
  }
}
