import { FC, useState, useEffect } from 'react';

import { useTheme } from '@mui/material';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const marginTop = 100;

const TableOfContents = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [sections, setSections] = useState([]);

  const customTheme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setOffsetY(0);
  }, []);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll('section.section-heading')
    );

    const allSections = els.map((el, index) => {
      const { top: boundingTop } = el.getBoundingClientRect();

      return {
        topic: el.getAttribute('id'),
        boundingTop,
        isActive: index === 0,
      };
    });

    setSections(allSections);
  }, []);

  useEffect(() => {
    if (sections.length <= 1) return;

    const onScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  useEffect(() => {
    if (sections.length === 0) return;

    if (sections.length === 1) {
      sections[0].isActive = true;
      return;
    }

    sections.forEach((section, index) => {
      if (index === 0) {
        section.isActive =
          sections[index + 1].boundingTop > offsetY + marginTop;
      } else {
        if (sections[index + 1]) {
          section.isActive =
            sections[index + 1].boundingTop > offsetY + marginTop &&
            sections[index].boundingTop <= offsetY + marginTop;
        } else {
          section.isActive = sections[index].boundingTop <= offsetY + marginTop;
        }
      }
    });
  }, [sections, offsetY]);

  return (
    <div style={{ position: 'fixed', top: 140, right: 0, width: 'inherit' }}>
      <Timeline>
        {sections ? sections.map((section, index) => {
          return (
            <TimelineItem key={index}>
              {index !== sections.length - 1 && (
                <TimelineSeparator>
                  <TimelineDot
                    color='secondary'
                    variant={section.isActive ? 'filled' : 'outlined'}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
              )}
              {index === sections.length - 1 && (
                <TimelineDot
                  color='secondary'
                  variant={section.isActive ? 'filled' : 'outlined'}
                />
              )}
              <TimelineContent>
                <span
                  onClick={() => {
                    window.scrollTo(0, section.boundingTop - marginTop);
                    setOffsetY(section.boundingTop - marginTop);
                  }}
                  style={{
                    textDecoration: 'none',
                    color: section.isActive
                      ? customTheme.palette.secondary.main
                      : customTheme.palette.text.primary,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                  }}
                >
                  {section.topic}
                </span>
              </TimelineContent>
            </TimelineItem>
          );
        }) : null}
      </Timeline>
    </div>
  );
};

export default TableOfContents;
