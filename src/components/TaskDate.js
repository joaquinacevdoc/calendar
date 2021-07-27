import React, { useState } from 'react';
import moment from 'moment';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { BsCircle } from "react-icons/bs";
import { FaSpaceShuttle, FaSun, FaRegPaperPlane, FaMinusCircle } from 'react-icons/fa';

export const TaskDate = ({
  setTaskDate,
  setDate,
  showTaskDate,
  setShowTaskDate,
  showButton,
  setShowButton
}) => {
  const [ monthCounter, setMonthCounter ] = useState(0);

  var a = moment().endOf('month');
  var b = moment();
  var daysTilEndMonth = a.diff(b, 'days');
  var nextMonth = moment().add((daysTilEndMonth + 1), 'days').format("DD/MM/YY");
  var nextMonthOn = moment(nextMonth, "DD/MM/YY").add((monthCounter - 1), 'month').format("DD/MM/YY");

  var freeRows = [];
  if (moment().format('E') < 7) {
    for (var i = 0; i < moment().format('E'); i++) {
      freeRows.push(<div className="free"></div>);
    };
  };

  var freeRowsNextMonth = [];
  if (moment(nextMonthOn, "DD/MM/YY").format('E') < 7) {
    for (var i = 0; i < moment(nextMonthOn, "DD/MM/YY").format('E'); i++) {
      freeRowsNextMonth.push(<div className="free"></div>);
    };
  };

  var daysLeftInMonth = [];
  function date(id) {
    setShowTaskDate(false);
    setShowButton(!showButton);
    setTaskDate(moment().add(id, 'days').format('DD/MM/YYYY'));
    setDate(moment().add(id, 'days').format('dd. MMM D'));
  }
  for (var i = 0; i < (daysTilEndMonth + 1); i++) {
    daysLeftInMonth.push(
      <button className="current-month" id={i} onClick={e => date(e.target.id)}>
        {moment().add(i, 'days').format('D')}
      </button>
    );
  };

  var daysInMonth = [];
  function dateNextMonth(id) {
    setShowTaskDate(false);
    setShowButton(!showButton);
    setTaskDate(moment(nextMonthOn, "DD/MM/YY").add(id, 'days').format('DD/MM/YYYY'));
    setDate(moment(nextMonthOn, "DD/MM/YY").add(id, 'days').format('dd. MMM D'));
  }
  for (var i = 0 ; i < moment(nextMonthOn, "DD/MM/YY").endOf('month').format('D'); i++) {
    daysInMonth.push(
      <button id={i} onClick ={e => dateNextMonth(e.target.id)}
      >
        {moment(nextMonthOn, "DD/MM/YY").add(i, 'days').format('D')}
      </button>
    );
  };

  return (
    <>
      {showTaskDate && (
        <div className="task-date" id="task-date" data-testid="task-date-overlay">
          <div className="task-date__list">
            <ul>
              <li
                onClick ={() => {
                  setShowTaskDate(false);
                  setShowButton(!showButton);
                  setTaskDate(moment().format('DD/MM/YYYY'));
                  setDate('Today');
                }}
                data-testid="task-date-overlay"
              >
                <span>
                  <FaSpaceShuttle />
                </span>
                <span>Today</span>
                <span>{moment().format('dd')}.</span>
              </li>
              <li
                onClick ={() => {
                  setShowTaskDate(false);
                  setShowButton(!showButton);
                  setTaskDate(moment().add(1,'day').format('DD/MM/YYYY'));
                  setDate('Tomorrow');
                }}
                data-testid="task-date-tomorrow"
              >
                <span>
                  <FaSun />
                </span>
                <span>Tomorrow</span>
                <span>{moment().add(1, 'day').format('dd')}.</span>
              </li>
              <li
                onClick ={() => {
                  setShowTaskDate(false);
                  setShowButton(!showButton);
                  setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
                  setDate(moment().add(7, 'days').format('dd. MMM D'));
                }}
                data-testid="task-date-next-week"
              >
                <span>
                  <FaRegPaperPlane />
                </span>
                <span>Next Week</span>
                <span>{moment().add(7, 'days').format('dd. MMM D')}.</span>
              </li>
              <li
                onClick ={() => {
                  setShowTaskDate(false);
                  setShowButton(!showButton);
                  setTaskDate('');
                  setDate('No Date');
                }}
                data-testid="no-task-date"
              >
                <span>
                  <FaMinusCircle />
                </span>
                <span>No date</span>
              </li>
            </ul>
          </div>
          <div className="task-date__calendar">
            <div className="task-date__calendar__header">
              <span className="month">
                {moment().add(monthCounter, 'month').format('MMMM YYYY')}
              </span>
              <div className="arrows">
                {monthCounter == 0 && (
                  <button className="blocked">
                    <IoIosArrowBack />
                  </button>
                )}
                {monthCounter > 0 && (
                  <button
                    onClick ={() => {
                      setMonthCounter(monthCounter - 1);
                    }}
                  >
                    <IoIosArrowBack />
                  </button>
                )}

                {monthCounter == 0 && (
                  <button className="blocked">
                    <BsCircle />
                  </button>
                )}
                {monthCounter > 0 && (
                  <button
                    onClick ={() => {
                      setMonthCounter(0);
                    }}
                  >
                    <BsCircle />
                  </button>
                )}

                <button
                  onClick ={() => {
                    setMonthCounter(monthCounter + 1);
                  }}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
            <div className="week">
              <p>S</p>
              <p>M</p>
              <p>T</p>
              <p>W</p>
              <p>T</p>
              <p>F</p>
              <p>S</p>
            </div>
            <div className ="days">
              {monthCounter == 0 && (
                freeRows
              )}
              {monthCounter == 0 && (
                daysLeftInMonth
              )}
              {monthCounter != 0 && (
                freeRowsNextMonth
              )}
              {monthCounter != 0 && (
                daysInMonth
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
