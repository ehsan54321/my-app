import AboutCoin from '@components/pageCoin/AboutCoin'
import Chart from '@components/pageCoin/chart'
import classNames from 'classnames'
import Image from 'next/image'
import Star from '@components/stars/Star'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { formatCurrency, numberToPersian } from '@lib/helper'
import { useTranslation } from 'react-i18next'

type Props = {
  coin: any
  rials: number
  nameCoin: string
}
const ControllerPageCoin = (props: Props) => {
  const { nameCoin } = props
  const { t } = useTranslation()
  return (
    <>
      <div className="row w-full ms-0">
        <div className="flex mb-3 justify-between col">
          <div className="flex">
            <div className="ms-2 flex">
              <div className="flex items-center coinPage_imgCoin">
                <Image
                  src={`/static/images/coins/${props.coin.poster_path}.svg`}
                  alt={props.coin.name}
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex pt-3">
                <div style={{ lineHeight: 0 }}>
                  <h1 className="ms-1 h5" title={t('name-coin')}>
                    {t('lang') ? props.coin.name : props.coin.all_name}
                  </h1>
                  <br />
                  <h2 className="flex mb-0 coinPage_nameEN">
                    <span className="text-uppercase text-[15px]">
                      {'(' + nameCoin + ')'}
                    </span>
                    <i className="text-white">_</i>
                    <span className="text-capitalize text-[15px]">
                      {t('lang') ? props.coin.all_name : props.coin.name}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex items-center ms-2 text-[17px] coinPage_star">
              <Star
                name={nameCoin}
                faName={props.coin.name}
                id={props.coin.id}
                poster_path={props.coin.poster_path}
              />
            </div>
          </div>
          <div className="flex items-center ms-1">
            <span
              style={{
                color: '#014a8f',
                background: '#f2f6f9',
                padding: '6px 8.5px',
              }}
              className="rounded-[10px]"
            >
              {'#' + numberToPersian(props.coin.id, t('lang'))}
            </span>
          </div>
        </div>
        <AboutCoin
          dayGrith={props.coin.dayGrith}
          aboutCoin={props.coin.aboutCoin}
        />
        <div className="col">
          <div
            title={t('change-24h')}
            className={classNames(
              props.coin.day.colorDayIn === 'danger' ? ' bg-red-500' : '',
              props.coin.day.colorDayIn === 'success' ? ' bg-green-700' : '',
              props.coin.day.colorDayIn === 'info' ? 'bg-blue-500' : '',
              'coinPage_dar text-white justify-center mt-3 flex h6'
            )}
          >
            <div>
              {props.coin.day.colorDayIn === 'danger' ? (
                <BsFillCaretDownFill />
              ) : (
                <BsFillCaretUpFill />
              )}
            </div>
            <span>
              {numberToPersian(props.coin.day.dayIn, t('lang')) +
                '٪' +
                (props.coin.day.colorDayIn === 'danger' ? '-' : '+')}
            </span>
          </div>
        </div>
        <div></div>
        <div
          className="mt-3 mb-3 col"
          style={{ paddingLeft: 'calc(var(--bs-gutter-x) * .0)' }}
        >
          <div className="flex flex-col" title={t('mane-usd')}>
            <span className="text-slate-500">{t('mane-usd')}:</span>
            <span className="text-[18px] mt-1">
              {numberToPersian(formatCurrency(props.coin.usd), t('lang'))}
              <span
                className={classNames(
                  'uiCoin_toman',
                  t('lang') ? 'ms-1' : 'me-1'
                )}
              >
                {t('usd')}
              </span>
            </span>
          </div>
        </div>
        <div className="flex mt-3 items-center mb-3 col">
          <div className="flex flex-col" title={t('mane-rials')}>
            <span className="text-slate-500">{t('mane-rials')}:</span>
            <span className="text-[18px] mt-1">
              {numberToPersian(
                formatCurrency(~~(props.coin.usd * props.rials)),
                t('lang')
              )}
              <span
                className={classNames(
                  'uiCoin_toman',
                  t('lang') ? 'ms-1' : 'me-1'
                )}
              >
                {t('toman')}
              </span>
            </span>
          </div>
        </div>
      </div>
      <Chart props={props.coin} nameCoin={nameCoin} />
    </>
  )
}

export default ControllerPageCoin
