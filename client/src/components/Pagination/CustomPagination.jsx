import { Pagination, Dropdown } from 'react-bootstrap'
import PropTypes from 'prop-types';

import styles from "./CustomPagination.module.css";

const CustomPagination = (props) => {
  const {
    handleChangePage,
    handleRowsPerPageChange,
    totalPage,
    page,
    rowsPerPage,
  } = props;

  return (
    <div className={styles.container}>
      <Pagination>
        <Pagination.First onClick={() => handleChangePage(1)} />
        <Pagination.Prev
          onClick={() =>
            handleChangePage((prev) => (prev - 1 > 0 ? prev - 1 : 1))
          }
        />
        {[...Array(totalPage)].map((_, x) => (
          <Pagination.Item
            key={'page-num-' + (x + 1)}
            active={x + 1 === page}
            onClick={() => handleChangePage(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            handleChangePage((prev) =>
              prev + 1 <= totalPage ? prev + 1 : prev
            )
          }
        />
        <Pagination.Last onClick={() => handleChangePage(totalPage)} />
      </Pagination>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.dropdown}>
          {rowsPerPage}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClickCapture={() => handleRowsPerPageChange(25)}>
            25
          </Dropdown.Item>
          <Dropdown.Item onClickCapture={() => handleRowsPerPageChange(30)}>
            30
          </Dropdown.Item>
          <Dropdown.Item onClickCapture={() => handleRowsPerPageChange(40)}>
            40
          </Dropdown.Item>
          <Dropdown.Item onClickCapture={() => handleRowsPerPageChange(50)}>
            50
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

// ESLINT PROBLEM react/prop-types
CustomPagination.propTypes = {
    handleChangePage       : PropTypes.func.isRequired,
    handleRowsPerPageChange: PropTypes.func.isRequired,
    totalPage              : PropTypes.number.isRequired,
    page                   : PropTypes.number.isRequired,
    rowsPerPage            : PropTypes.number.isRequired,
};

export default CustomPagination;
