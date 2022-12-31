import classNames from 'classnames'
import Image from 'next/image'
import UiCoin from './UiCoin'
import { useTranslation } from 'react-i18next'

type Props = { data; rials: number; lanData: boolean }
const MapCoin = (props: Props) => {
  const { data, rials, lanData } = props
  const { t } = useTranslation()
  return (
    <>
      <table
        className={classNames('table hover w-full', lanData ? 'hidden' : '')}
      >
        <thead>
          <tr className="tr h-auto">
            <th className="text-center max-sm:hidden uiCoin_idTh">#</th>
            <th className="text-right uiCoin_coin">{t('name-coin')}</th>
            <th className="uiCoin_price">
              <span className="max-sm:hidden">{t('mane-rials')}</span>
              <span className="sm:hidden">{t('price')}</span>
            </th>
            <th className="uiCoin_change">{t('change-24h')}</th>
            <th className="max-sm:hidden uiCoin_usd">{t('mane-usd')}</th>
            <th className="hidden lg:table-cell	uiCoin_change7">
              {t('change-7d')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <UiCoin
              key={coin.id}
              my_key={coin.key}
              {...coin}
              dayAll={coin.day}
              rialsOne={rials}
            />
          ))}
        </tbody>
      </table>
      {lanData && (
        <div className="m-5 p-5 text-center">
          <Image
            src="/static/images/no-data.svg"
            className="mb-2 mr-4"
            alt="لوگو"
            width={100}
            height={100}
          />
          <p className="text-slate-500">{t('no.coin')}</p>
        </div>
      )}
    </>
  )
}

export default MapCoin
