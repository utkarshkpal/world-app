import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatListByKey } from "utils/jsUtils";
import { COUNTRY_BY_FULL_NAME, COUNTRY_BY_ISO_URL } from "./api";
import { ICountryFullDetail } from "types";
import { Button, Col, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./country-detail.css";

const CountryDetail: React.FC<{}> = () => {
  const [countryDetail, setcountryDetail] =
    useState<ICountryFullDetail | null>(null);
  const { name } = useParams();

  useEffect(() => {
    async function fetchCountryNameByISO(countryISO: string): Promise<string> {
      const response = await fetch(`${COUNTRY_BY_ISO_URL}/${countryISO}`);
      const country = await response.json();
      return country.name;
    }

    async function fetchCountriesByFullName() {
      const response = await fetch(
        `${COUNTRY_BY_FULL_NAME}/${name}?fullText=true`
      );
      const countriesData = await response.json();

      const {
        name: countryName,
        nativeName,
        population,
        region,
        capital,
        subregion,
        topLevelDomain,
        flag,
        currencies,
        languages,
        borders,
      } = countriesData[0];

      const borderCountriesName: string[] = await Promise.all(
        borders.map((border: string) => fetchCountryNameByISO(border))
      );

      setcountryDetail({
        name: countryName,
        nativeName,
        population,
        region,
        capital,
        subregion,
        topLevelDomain,
        flag,
        currencies,
        languages,
        borderCountriesName,
      });
    }
    fetchCountriesByFullName();
  }, [name]);

  if (!countryDetail) return null;

  const {
    name: countryName,
    nativeName,
    population,
    region,
    capital,
    subregion,
    topLevelDomain,
    flag,
    currencies,
    languages,
    borders,
    borderCountriesName,
  } = countryDetail;

  console.log({ countryDetail });

  // add empty check and loading states... // once useFetch is fixed
  if (!countryDetail.nativeName) return null;

  return (
    <div>
      <Row>
        <Col span={24}>
          <Link to="/">
            <Button icon={<ArrowLeftOutlined />} size="large">
              Back
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="detail-wrapper" gutter={[24, 24]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <img alt="flag-img" className="detail-flag-img" src={flag} />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className="detail-metric-wrapper"
        >
          <Row>
            <Col span={24}>
              <h1>{countryName}</h1>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Row>
                    <Col className="detail-description">Native Name:</Col>
                    <Col className="detail-metric">{nativeName}</Col>
                  </Row>

                  <Row>
                    <Col className="detail-description">Population:</Col>
                    <Col className="detail-metric">{population}</Col>
                  </Row>
                  <Row>
                    <Col className="detail-description">Region:</Col>
                    <Col className="detail-metric">{region}</Col>
                  </Row>
                  <Row>
                    <Col className="detail-description">Sub Region:</Col>
                    <Col className="detail-metric">{subregion}</Col>
                  </Row>
                  <Row>
                    <Col className="detail-description">Capital:</Col>
                    <Col className="detail-metric">{capital}</Col>
                  </Row>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Row>
                    <Col className="detail-description">Top Level Domain:</Col>
                    <Col className="detail-metric">
                      {topLevelDomain.join(",")}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="detail-description">Currencies:</Col>
                    <Col className="detail-metric">
                      {formatListByKey(currencies, "name", ",")}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="detail-description">Languages:</Col>
                    <Col className="detail-metric">
                      {formatListByKey(languages, "name", ",")}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="detail-border-wrapper">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={5}
              xl={5}
              className="detail-description"
            >
              Border Countries:
            </Col>
            <Col xs={24} sm={24} md={24} lg={19} xl={19}>
              {borderCountriesName?.map((borderCountry: string) => (
                <Link key={borderCountry} to={`/detail/${borderCountry}`}>
                  <Button className="detail-border-btn">{borderCountry}</Button>
                </Link>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CountryDetail;
