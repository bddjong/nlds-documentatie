import { IconUser } from '@tabler/icons-react';
import {
  Icon,
  Link,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@utrecht/component-library-react/dist/css-module';
import clsx from 'clsx';
import React, { HTMLTableAttributes } from 'react';
import style from './SessionTable.module.css';

interface Speaker {
  name: string;
  organisation: string;
}

interface Session {
  isoDateTime: string;
  speakers: Speaker[];
  subject: string;
  singupLink: string;
  icalLink?: string;
  language: { abbr: string; description: string };
}

interface SessionTableProps extends HTMLTableAttributes<HTMLTableElement> {
  lang?: string;
  sessions: Session[];
}

const SpeakerData = ({ name, organisation }: Speaker) => (
  <Paragraph className={clsx(style['session-table__speaker'], style['speaker'])}>
    <Icon className={style['speaker__icon']}>
      <IconUser />
    </Icon>
    <span className={clsx(style['speaker__name'])}>{name}</span>
    <br />
    <span className={clsx(style['speaker__organisation'])}>{organisation}</span>
  </Paragraph>
);

export const SessionTable = ({ lang, sessions, className, ...props }: SessionTableProps) => {
  return (
    <div className={clsx(style['session-table-container'], className)}>
      <Table className={clsx(style['session-table'], className)} {...props}>
        <TableHeader>
          <TableRow className={clsx(style['session-table__row'])}>
            <TableHeaderCell>{lang === 'nl-NL' ? 'Tijd' : 'Time'}</TableHeaderCell>
            <TableHeaderCell>{lang === 'nl-NL' ? 'Spreker' : 'Speaker'}</TableHeaderCell>
            <TableHeaderCell>{lang === 'nl-NL' ? 'Onderwerp' : 'Subject'}</TableHeaderCell>
            {lang === 'nl-NL' && <TableHeaderCell>Taal</TableHeaderCell>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map(({ isoDateTime, speakers, subject, singupLink, language }, index) => (
            <TableRow className={clsx(style['session-table__row'])} key={index}>
              <TableCell className={clsx(style['session-table__time'])}>
                <Paragraph>
                  <time dateTime={isoDateTime}>
                    {new Intl.DateTimeFormat(lang, {
                      hour: 'numeric',
                      minute: 'numeric',
                      timeZone: 'Europe/Amsterdam',
                      timeZoneName: lang !== 'nl-NL' ? 'short' : undefined,
                    }).format(new Date(isoDateTime))}
                  </time>
                </Paragraph>
              </TableCell>
              <TableCell>
                <div className={clsx(style['session-table__speakers'])}>
                  {speakers.map((speaker, index) => (
                    <SpeakerData key={index} {...speaker} />
                  ))}
                </div>
              </TableCell>
              <TableCell className={clsx(style['session-table__subject'])}>
                <Paragraph>
                  <Link href={singupLink}>{subject}</Link>
                </Paragraph>
              </TableCell>
              {lang === 'nl-NL' && (
                <TableCell className={clsx(style['session-table__language'])}>
                  <abbr title={language.description}>{language.abbr}</abbr>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
