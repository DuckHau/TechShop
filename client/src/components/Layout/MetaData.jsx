import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`TechShop | ${title}`}</title>
    </Helmet>
  )
}

export default MetaData
