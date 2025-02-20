import React from 'react';
import ErrorBoundary from '@src/components/ErrorBoundary';
import { useSelector } from 'react-redux';
import { marketTokens } from '@src/redux/selectors/shared';
import { useSearchBox } from '@src/components/Header';
import { handleFilterTokenByKeySearch, useTokenList } from '@src/components/Token';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';

const withSearch = (WrappedComp) => (props) => {
  const { filterField, orderField } = props;
  const availableTokens = useSelector(marketTokens);
  let verifiedTokens = [];
  let unVerifiedTokens = [];
  availableTokens.map((token) =>
    token?.isVerified
      ? verifiedTokens.push(token)
      : unVerifiedTokens.push(token),
  );
  const [toggleUnVerified, onToggleUnVerifiedTokens] = useTokenList();
  const [_verifiedTokens, keySearch, handleFilterData] = useSearchBox({
    data: verifiedTokens,
    shouldCleanSearch: false,
    handleFilter: () =>
      handleFilterTokenByKeySearch({ tokens: verifiedTokens, keySearch }),
  });
  const [_unVerifiedTokens, _keySearch, _handleFilterData] = useSearchBox({
    data: unVerifiedTokens,
    shouldCleanSearch: false,
    handleFilter: () =>
      handleFilterTokenByKeySearch({
        tokens: unVerifiedTokens,
        keySearch: _keySearch,
      }),
  });

  React.useEffect(() => {
    const __verifiedTokens = handleFilterTokenByKeySearch({
      tokens: verifiedTokens,
      keySearch,
    });
    handleFilterData(__verifiedTokens);
    if (toggleUnVerified) {
      const __unVerifiedTokens = handleFilterTokenByKeySearch({
        tokens: unVerifiedTokens,
        keySearch: _keySearch,
      });
      _handleFilterData(__unVerifiedTokens);
    }
  }, [availableTokens]);

  const tokensFactories = React.useMemo(() => {
    let marketTokens = _verifiedTokens
      .concat(_unVerifiedTokens.filter(item => item.isFollowed))
      .filter(token => !!token.defaultPoolPair);
    marketTokens = orderBy(marketTokens, item => Number(item[filterField] || '0'), [orderField]);
    const __verifiedTokens = orderBy(_verifiedTokens, item => Number(item[filterField] || '0'), [orderField]);
    const __unVerifiedTokens = orderBy(_unVerifiedTokens, item => Number(item[filterField] || '0'), [orderField]);
    return [
      {
        data: __verifiedTokens,
        visible: true,
        styledListToken: { paddingTop: 8 },
      },
      {
        data: __unVerifiedTokens,
        visible: toggleUnVerified,
        styledListToken: { paddingTop: 15 },
      },
      {
        data: marketTokens,
        visible: true,
        styledListToken: { paddingTop: 8 },
      }
    ];
  }, [_unVerifiedTokens, _verifiedTokens, toggleUnVerified, filterField, orderField]);

  React.useEffect(() => {
    if (toggleUnVerified && !keySearch) {
      onToggleUnVerifiedTokens();
    }
  }, [keySearch]);

  return (
    <ErrorBoundary>
      <WrappedComp
        {...{
          ...props,
          tokensFactories,
          toggleUnVerified,
          onToggleUnVerifiedTokens,
          keySearch
        }}
      />
    </ErrorBoundary>
  );
};

withSearch.defaultProps = {
  filterField: 'change',
  orderField: 'desc'
};
withSearch.propTypes = {
  availableTokens: PropTypes.array.isRequired,
  filterField: PropTypes.string,
  orderField: PropTypes.string
};

export default withSearch;
