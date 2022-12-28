import classNames from 'classnames'
import MapCoin from './MapCoin'
import { BsSearch } from 'react-icons/bs'
import { numberToPersian, removeSpas } from '@lib/helper'
import { startTransition, useState } from 'react'
import { TbX } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'

type coinType = {
  id: number
  key: string
  name: string
  poster_path: string
  all_name: string
  usd: number
  day: {
    value_24h: number
    day_in: number
    color_day_in: string
    day7: number
    color_day7: string
  }
}
const ControllerCoins = ({ dataServer }) => {
  const pageItem: number = 15
  const { pageSize } = dataServer
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<coinType[]>(dataServer.coins)
  const [dataView, setDataView] = useState<coinType[]>(data.slice(0, pageItem))
  const [searchValue, setSearchValue] = useState<string>('')
  const { t } = useTranslation()
  const arrPageSize = () => {
    const arr: number[] = [1]
    for (let i = 1; i < pageSize; i++) arr.push(arr.length + 1)
    return arr.sort((a, c) => c - a)
  }
  const PageSizeHandler = (pageName) => {
    setPage(pageName)
    for (let i = 1; i <= pageSize; i++) {
      if (pageName === i) {
        // PageLengthCoin => PLC
        const PLC = (i - 1) * pageItem
        setDataView(data.slice(PLC, PLC + pageItem))
      }
    }
  }
  const searchHandler = (searchValue) => {
    const dataSearch = dataServer.coins.filter(
      (coin: coinType) =>
        removeSpas(coin.key).includes(searchValue) ||
        removeSpas(coin.name).includes(searchValue) ||
        removeSpas(coin.all_name).toLocaleLowerCase().includes(searchValue) ||
        numberToPersian(coin.id.toString(), 'fa') ===
          numberToPersian(searchValue, 'fa')
    )
    setData(dataSearch)
    if (dataSearch.length === dataServer.coins.length) {
      for (let i = 1; i <= pageSize; i++) {
        if (page === i) {
          // PageLengthCoin => PLC
          const PLC = (i - 1) * pageItem
          setDataView(dataSearch.slice(PLC, PLC + pageItem))
        }
      }
    } else setDataView(dataSearch)
  }
  return (
    <>
      <div className="mx-6 mb-6 flex mt-2 sm:max-w-[260px]">
        <button type="submit" className="uiCoin_searchBtn h5 text-white">
          <BsSearch />
        </button>
        <button
          type="submit"
          className="h5 relative cursor-pointer bg-white flex"
          onClick={() => {
            setSearchValue('')
            searchHandler('')
          }}
        >
          {searchValue && (
            <span className="absolute bg-black mr-1 text-white rounded-full w-6 top-[6.2px]">
              ×
            </span>
          )}
        </button>
        <input
          type="text"
          className={classNames(
            'border-r-0 w-full uiCoin_search',
            !searchValue ? 'text-right' : ''
          )}
          maxLength={pageItem}
          dir="auto"
          value={searchValue}
          placeholder={
            t('lang')
              ? `جستجو بین ${numberToPersian(
                  dataServer.coins.length,
                  '1'
                )} کوین`
              : `search ${dataServer.coins.length} coin`
          }
          onChange={(e) => {
            startTransition(() => {
              searchHandler(removeSpas(e.target.value.toLocaleLowerCase()))
            })
            setSearchValue(e.target.value)
            e.preventDefault()
          }}
        />
      </div>
      <MapCoin
        rials={dataServer.rials}
        data={dataView}
        lanData={data.length <= 0}
      />

      {data.length > pageItem && (
        <nav>
          <ul className="pagination justify-center mt-2" dir="ltr">
            {arrPageSize().map((item) => (
              <li className="page-item" key={item}>
                <a
                  className={page === item ? 'page-link active' : 'page-link'}
                  onClick={() => PageSizeHandler(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}

export default ControllerCoins
