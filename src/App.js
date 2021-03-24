import React, { useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  makeStyles,
} from '@material-ui/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import clsx from 'clsx';

// css
import './App.css';

const App = () => {
  const classes = useStyles();
  const ref1 = useRef();
  const ref2 = useRef();

  const generatePDF = async (fitHeight) => {
    // fitHeight
    // ㄴ true - 세로가 A4 높이보다 높은 경우 비율을 세로에 맞춰 줄임
    // ㄴ false - 세로가 A4 높이보다 높아도 잘라서 페이지 분할
    try {
      if (ref1.current && ref2.current) {
        const result1 = await html2canvas(ref1.current, {
          // 이미지 사용할 경우 allowTaint, useCORS 사용
          // S3 버킷인 경우 옵션 사용해도 이미지 출력이 되지 않음
          // API 서버에서 S3 버킷에 있는 이미지를 전달하는 API를 개발 필요
          /* allowTaint: true,
          useCORS: true, */
        });
        const result2 = await html2canvas(ref2.current, {
          /* allowTaint: true,
          useCORS: true, */
        });
        const canvasArray = [result1, result2];
        const doc = new jsPDF('p', 'mm');

        canvasArray.forEach((canvas, index) => {
          const imageData = canvas.toDataURL('image/png');
          let imageWidth = 210;
          const pageHeight = imageWidth * 1.414;
          let imageHeight = (canvas.height * imageWidth) / canvas.width;
          const resizeRatio =
            fitHeight && imageHeight > pageHeight
              ? pageHeight / imageHeight
              : 1;
          imageWidth *= resizeRatio;
          imageHeight *= resizeRatio;
          let restHeight = imageHeight;
          let xPosition = (210 - imageWidth) / 2;
          let yPosition = 0;

          do {
            if (index > 0) {
              // 기본적으로 페이지 하나는 생성되어있음
              // 첫 페이지가 아닐 경우에만 addPage
              doc.addPage();
            }

            yPosition = restHeight - imageHeight;
            doc.addImage(
              imageData,
              'PNG',
              xPosition,
              yPosition,
              imageWidth,
              imageHeight
            );
            restHeight -= pageHeight;
          } while (restHeight > 0);
        });

        doc.save('filename.pdf');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={clsx('App', classes.root)}>
      <Container maxWidth={false}>
        <Box
          minWidth={700}
          display="flex"
          justifyContent="center"
          paddingBottom={1}
          className={classes.buttons}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              generatePDF(true);
            }}
          >
            PDF 다운로드
            <br />
            (높이 맞추기)
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => generatePDF(false)}
          >
            PDF 다운로드
            <br />
            (넘치면 자르기)
          </Button>
        </Box>
        <Box ref={ref1} mt={3}>
          <Box minWidth={700} display="flex" justifyContent="flex-start" p={1}>
            <Typography variant="h4" color="textPrimary">
              PDF page 1
            </Typography>
          </Box>
          <Card className={classes.card}>
            <Box minWidth={700}>
              <Table>
                <colgroup>
                  <col className={classes.th} />
                  <col className={classes.td} />
                  <col className={classes.th} />
                  <col className={classes.td} />
                </colgroup>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell colSpan="3">text</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">아이디</TableCell>
                    <TableCell>text</TableCell>
                    <TableCell align="center">닉네임</TableCell>
                    <TableCell>text</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">이메일</TableCell>
                    <TableCell>text</TableCell>
                    <TableCell align="center">연락처</TableCell>
                    <TableCell>text</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">접속 이력</TableCell>
                    <TableCell>text</TableCell>
                    <TableCell align="center">가입일</TableCell>
                    <TableCell>text</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Box>

        <Box ref={ref2} mt={3}>
          <Box minWidth={700} display="flex" justifyContent="flex-start" p={1}>
            <Typography variant="h4" color="textPrimary">
              PDF page 2
            </Typography>
          </Box>
          <Card className={classes.card}>
            <Box minWidth={700}>
              <Table>
                <colgroup>
                  <col className={classes.th} />
                  <col className={classes.td} />
                  <col className={classes.th} />
                  <col className={classes.td} />
                </colgroup>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">title</TableCell>
                    <TableCell colSpan="3">description</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflowY: 'auto',
    width: '100%',
  },
  card: {
    position: 'relative',
    marginBottom: theme.spacing(5),
    boxShadow: 'none',
    backgroundColor: 'white',
  },
  th: {
    width: '20%',
    backgroundColor: '#fafafa',
  },
  td: {
    width: '30%',
  },
  button: {
    margin: theme.spacing(0.5, 1, 0.5, 0),
  },
  buttons: {
    '& > button': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default App;
